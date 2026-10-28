CREATE TYPE user_role AS ENUM ('TEACHER', 'STUDENT', 'PARENT');
CREATE TYPE ui_mode AS ENUM ('KIDS_ELEMENTARY', 'STANDARD_SECONDARY', 'HIGH_SCHOOL_EXAM');
CREATE TYPE assessment_type AS ENUM ('IN_SESSION_90M', 'HOMEWORK');
CREATE TYPE question_type AS ENUM (
    'MULTIPLE_CHOICE',
    'FILL_IN_BLANK',
    'PASSAGE_GROUP',   -- Đoạn văn/Audio có nhiều câu hỏi con (Tiếng Anh 11, 12)
    'ESSAY_UPLOAD'     -- Tự luận gõ LaTeX hoặc chụp ảnh vở (Toán, Hóa, Writing)
);
CREATE TYPE attempt_status AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'SUBMITTED', 'GRADED');

-- Bảng tài khoản chung
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE, -- Có thể NULL với học sinh lớp 2 (chỉ dùng username/PIN)
    password_hash TEXT NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role user_role NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Hồ sơ chi tiết dành riêng cho STUDENT (Quy định luồng UI và khối lớp)
CREATE TABLE student_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    grade_level SMALLINT NOT NULL CHECK (grade_level BETWEEN 1 AND 12), -- VD: 2, 7, 9, 11, 12
    ui_theme ui_mode NOT NULL DEFAULT 'STANDARD_SECONDARY',
    default_session_minutes INT NOT NULL DEFAULT 90,
    tutor_private_notes TEXT, -- Ghi chú riêng của gia sư về học lực của bé
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bảng liên kết Phụ huynh - Học sinh (Quyết định quyền Read-Only của Parent)
CREATE TABLE parent_student_links (
    parent_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    relationship VARCHAR(50) DEFAULT 'Parent', -- Bố, Mẹ, Người giám hộ
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (parent_id, student_id)
);

-- Danh mục môn học (VD: Tiếng Anh 11, Tiếng Anh 12, Toán 7, Hóa 9, Toán 2)
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL, -- VD: 'ENG_12', 'MATH_7', 'CHEM_9', 'MATH_2'
    name VARCHAR(150) NOT NULL,
    target_grade SMALLINT NOT NULL,
    enable_latex BOOLEAN NOT NULL DEFAULT FALSE, -- Bật bộ gõ công thức cho Toán/Hóa
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Đơn vị bài học (Learning Unit = Bài giảng + Bài tập 90p + BTVN)
CREATE TABLE learning_units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE RESTRICT,
    created_by UUID NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    -- Nội dung bài giảng lý thuyết (Markdown, LaTeX, Links video/audio, File đính kèm)
    lecture_content_markdown TEXT,
    lecture_attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_template BOOLEAN NOT NULL DEFAULT TRUE, -- True nếu muốn tái sử dụng cho học sinh khác
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bảng Đề bài tập (Mỗi Learning Unit thường có 2 bản ghi: 1 cho IN_SESSION_90M, 1 cho HOMEWORK)
CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learning_unit_id UUID NOT NULL REFERENCES learning_units(id) ON DELETE CASCADE,
    type assessment_type NOT NULL, -- 'IN_SESSION_90M' hoặc 'HOMEWORK'
    title VARCHAR(255) NOT NULL,
    instructions TEXT,
    time_limit_minutes INT, -- Mặc định 90 cho IN_SESSION_90M, có thể NULL cho HOMEWORK
    max_score NUMERIC(5,2) NOT NULL DEFAULT 10.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bảng Câu hỏi (Hỗ trợ đa môn học qua JSONB)
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    parent_question_id UUID REFERENCES questions(id) ON DELETE CASCADE, -- Dùng khi câu hỏi nằm trong 1 bài Đọc/Nghe (PASSAGE_GROUP)
    order_index INT NOT NULL DEFAULT 0,
    type question_type NOT NULL,
    points NUMERIC(5,2) NOT NULL DEFAULT 1.00,

    -- Chứa nội dung đề bài, ảnh minh họa, file nghe, các lựa chọn A/B/C/D...
    question_payload JSONB NOT NULL,
    
    -- Chứa đáp án đúng (để auto-grade) và lời giải chi tiết (chỉ trả về API sau khi đã chấm)
    grading_key_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- Bảng Giao bài Hàng ngày cho từng Học sinh (Trái tim của luồng cá nhân hóa 1v1)
CREATE TABLE daily_student_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    learning_unit_id UUID NOT NULL REFERENCES learning_units(id) ON DELETE RESTRICT,
    assigned_by UUID NOT NULL REFERENCES users(id),

    assigned_date DATE NOT NULL, -- Ngày học (VD: 2026-10-28)
    custom_session_minutes INT DEFAULT 90, -- Ghi đè thời gian làm bài trên lớp nếu cần
    homework_due_at TIMESTAMPTZ, -- Hạn chót nộp BTVN
    
    lecture_viewed_at TIMESTAMPTZ, -- Thời điểm học sinh đã mở xem bài giảng
    teacher_daily_note TEXT, -- Nhận xét chung của cả buổi học hôm đó (hiển thị cho Phụ huynh)
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (student_id, learning_unit_id, assigned_date)
);

-- Lượt làm bài của Học sinh (Tách riêng lượt làm Bài 90p và lượt làm BTVN)
CREATE TABLE assessment_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    daily_assignment_id UUID NOT NULL REFERENCES daily_student_assignments(id) ON DELETE CASCADE,
    assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE RESTRICT,
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    status attempt_status NOT NULL DEFAULT 'NOT_STARTED',
    started_at TIMESTAMPTZ,
    submitted_at TIMESTAMPTZ,
    time_spent_seconds INT NOT NULL DEFAULT 0, -- Theo dõi thời gian thực tế bé làm bài
    is_overtime BOOLEAN NOT NULL DEFAULT FALSE,
    
    auto_score NUMERIC(5,2) DEFAULT 0,
    manual_score NUMERIC(5,2) DEFAULT 0,
    total_score NUMERIC(5,2) DEFAULT 0,
    
    overall_feedback TEXT, -- Nhận xét của giáo viên riêng cho bài tập này
    graded_by UUID REFERENCES users(id),
    graded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (daily_assignment_id, assessment_id)
);

-- Chi tiết câu trả lời của Học sinh cho từng câu hỏi
CREATE TABLE student_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL REFERENCES assessment_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,

    -- Lưu lựa chọn của học sinh, chuỗi điền từ, hoặc mảng URL ảnh chụp vở bài tập
    answer_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    is_correct BOOLEAN, -- NULL nếu chờ giáo viên chấm tự luận
    awarded_points NUMERIC(5,2) DEFAULT 0,
    teacher_comment TEXT, -- Lời phê chi tiết vào từng câu
    annotated_image_url TEXT, -- Ảnh bài làm của học sinh đã được giáo viên khoanh đỏ/chấm chữa lên
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (attempt_id, question_id)
);

-- Các Index tối ưu hiệu năng truy vấn cho bảng Dashboard & Chấm bài
CREATE INDEX idx_student_profiles_grade ON student_profiles(grade_level);
CREATE INDEX idx_parent_student_links_parent ON parent_student_links(parent_id);
CREATE INDEX idx_parent_student_links_student ON parent_student_links(student_id);
CREATE INDEX idx_learning_units_subject ON learning_units(subject_id);
CREATE INDEX idx_assessments_unit ON assessments(learning_unit_id);
CREATE INDEX idx_questions_assessment ON questions(assessment_id, order_index);
CREATE INDEX idx_daily_assignments_student_date ON daily_student_assignments(student_id, assigned_date);
CREATE INDEX idx_assessment_attempts_assignment ON assessment_attempts(daily_assignment_id);
CREATE INDEX idx_assessment_attempts_student_status ON assessment_attempts(student_id, status);
CREATE INDEX idx_student_answers_attempt ON student_answers(attempt_id);

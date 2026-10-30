import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubmitAttemptDto } from './dto/submit-attempt.dto';
import { attempt_status, question_type, user_role, assessment_type } from '@prisma/client';

@Injectable()
export class AttemptsService {
  constructor(private prisma: PrismaService) {}

  async startAttempt(attemptId: string, studentId: string) {
    const attempt = await this.prisma.assessment_attempts.findUnique({
      where: { id: attemptId },
      include: { assessments: true },
    });

    if (!attempt) {
      throw new NotFoundException('Không tìm thấy lượt làm bài');
    }

    if (attempt.student_id !== studentId) {
      throw new ForbiddenException('Bạn không có quyền thực hiện bài tập này');
    }

    if (attempt.status === attempt_status.GRADED || attempt.status === attempt_status.SUBMITTED) {
      throw new BadRequestException('Bài tập này đã được nộp trước đó');
    }

    // Nếu chưa bắt đầu thì ghi nhận thời điểm bắt đầu
    if (attempt.status === attempt_status.NOT_STARTED) {
      return this.prisma.assessment_attempts.update({
        where: { id: attemptId },
        data: {
          status: attempt_status.IN_PROGRESS,
          started_at: new Date(),
        },
      });
    }

    return attempt;
  }

  async submitAttempt(dto: SubmitAttemptDto, studentId: string) {
    const attempt = await this.prisma.assessment_attempts.findUnique({
      where: { id: dto.attemptId },
      include: {
        assessments: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (!attempt) {
      throw new NotFoundException('Không tìm thấy lượt làm bài');
    }

    if (attempt.student_id !== studentId) {
      throw new ForbiddenException('Bạn không có quyền nộp bài cho học sinh khác');
    }

    if (attempt.status === attempt_status.GRADED || attempt.status === attempt_status.SUBMITTED) {
      throw new BadRequestException('Bài tập đã được nộp trước đó');
    }

    const questionsMap = new Map(attempt.assessments.questions.map((q) => [q.id, q]));

    let autoTotalScore = 0;
    let hasEssayQuestions = false;
    const answerRecords: any[] = [];

    // Chấm tự động cho các câu hỏi trắc nghiệm & điền từ
    for (const ans of dto.answers) {
      const question = questionsMap.get(ans.questionId);
      if (!question) continue;

      const qPoints = Number(question.points);
      const gradingKey = (question.grading_key_payload as any) || {};
      const studentPayload = ans.answerPayload || {};

      let isCorrect: boolean | null = null;
      let awardedPoints = 0;

      if (question.type === question_type.MULTIPLE_CHOICE) {
        const correctOpt = gradingKey.correct_option_id;
        const selectedOpt = studentPayload.selected_option_id;
        if (selectedOpt && correctOpt && selectedOpt.toString().trim().toUpperCase() === correctOpt.toString().trim().toUpperCase()) {
          isCorrect = true;
          awardedPoints = qPoints;
          autoTotalScore += qPoints;
        } else {
          isCorrect = false;
          awardedPoints = 0;
        }
      } else if (question.type === question_type.FILL_IN_BLANK) {
        const accepted = (gradingKey.accepted_answers || [gradingKey.correct_text]).map((s: string) =>
          s?.toString().trim().toLowerCase(),
        );
        const studentText = (studentPayload.text || '').toString().trim().toLowerCase();
        if (studentText && accepted.includes(studentText)) {
          isCorrect = true;
          awardedPoints = qPoints;
          autoTotalScore += qPoints;
        } else {
          isCorrect = false;
          awardedPoints = 0;
        }
      } else if (question.type === question_type.ESSAY_UPLOAD) {
        // Tự luận hoặc ảnh chụp vở: Chờ giáo viên chấm thủ công
        hasEssayQuestions = true;
        isCorrect = null;
        awardedPoints = 0;
      }

      answerRecords.push({
        attempt_id: attempt.id,
        question_id: question.id,
        answer_payload: studentPayload,
        is_correct: isCorrect,
        awarded_points: awardedPoints,
      });
    }

    // Nếu đề thi 100% trắc nghiệm -> chuyển thẳng thành GRADED
    // Nếu đề có câu tự luận -> chuyển thành SUBMITTED chờ giáo viên chấm
    const finalStatus = hasEssayQuestions ? attempt_status.SUBMITTED : attempt_status.GRADED;

    return this.prisma.$transaction(async (tx) => {
      // Lưu câu trả lời
      for (const rec of answerRecords) {
        await tx.student_answers.upsert({
          where: {
            attempt_id_question_id: {
              attempt_id: rec.attempt_id,
              question_id: rec.question_id,
            },
          },
          update: {
            answer_payload: rec.answer_payload,
            is_correct: rec.is_correct,
            awarded_points: rec.awarded_points,
            updated_at: new Date(),
          },
          create: rec,
        });
      }

      // Cập nhật attempt
      const updatedAttempt = await tx.assessment_attempts.update({
        where: { id: attempt.id },
        data: {
          status: finalStatus,
          submitted_at: new Date(),
          time_spent_seconds: dto.timeSpentSeconds,
          auto_score: autoTotalScore,
          manual_score: 0,
          total_score: finalStatus === attempt_status.GRADED ? autoTotalScore : 0,
        },
        include: {
          student_answers: true,
        },
      });

      return updatedAttempt;
    });
  }

  async getAttemptDetails(attemptId: string, user: { id: string; role: user_role }) {
    const attempt = await this.prisma.assessment_attempts.findUnique({
      where: { id: attemptId },
      include: {
        assessments: {
          include: {
            questions: {
              orderBy: { order_index: 'asc' },
              include: { other_questions: true },
            },
          },
        },
        student_answers: true,
        users_assessment_attempts_student_idTousers: {
          select: { id: true, full_name: true, username: true },
        },
      },
    });

    if (!attempt) {
      throw new NotFoundException('Không tìm thấy lượt làm bài');
    }

    // Kiểm tra quyền truy cập:
    // - Giáo viên: xem được tất cả
    // - Học sinh: chỉ xem bài của mình
    // - Phụ huynh: chỉ xem bài của con mình
    if (user.role === user_role.STUDENT && attempt.student_id !== user.id) {
      throw new ForbiddenException('Bạn không có quyền xem bài làm này');
    }

    if (user.role === user_role.PARENT) {
      const isParent = await this.prisma.parent_student_links.findUnique({
        where: {
          parent_id_student_id: {
            parent_id: user.id,
            student_id: attempt.student_id,
          },
        },
      });
      if (!isParent) {
        throw new ForbiddenException('Bạn không có quyền xem bài làm của học sinh này');
      }
    }

    // Nếu bài chưa chấm xong và người xem là học sinh/phụ huynh -> ẩn grading_key_payload
    // Lưu ý: Đối với IN_SESSION_90M (luyện tập tương tác tại lớp), trích xuất correct_option_id vào question_payload để kích hoạt animation rung lắc, âm thanh và phản hồi tức thì
    if (user.role !== user_role.TEACHER && attempt.status !== attempt_status.GRADED) {
      const isInSession = attempt.assessments?.type === assessment_type.IN_SESSION_90M;
      attempt.assessments.questions = attempt.assessments.questions.map((q) => {
        const { grading_key_payload, ...safeQ } = q;
        const correctOpt =
          (grading_key_payload as any)?.correct_option_id ||
          (safeQ.question_payload as any)?.correct_option_id;

        if (isInSession && correctOpt) {
          return {
            ...safeQ,
            question_payload: {
              ...(safeQ.question_payload as any),
              correct_option_id: correctOpt,
            },
          } as any;
        }
        return safeQ as any;
      });
    }

    return attempt;
  }
}

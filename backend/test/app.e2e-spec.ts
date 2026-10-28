import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AllExceptionsFilter } from '../src/common/filters/http-exception.filter';
import { TransformInterceptor } from '../src/common/interceptors/transform.interceptor';

describe('Teaching Platform LMS API (e2e)', () => {
  let app: INestApplication;
  let teacherToken: string;
  let studentToken: string;
  let parentToken: string;
  let sampleAttemptId: string;
  let essayQuestionId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api', { exclude: ['health'] });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalInterceptors(new TransformInterceptor());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // 1. Health check
  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect((res) => {
        expect(res.body.data.status).toBe('ok');
        expect(res.body.data.service).toBe('teaching-platform-backend');
      });
  });

  // 2. Auth: Đăng nhập Giáo viên
  it('/api/auth/login as Teacher', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        identifier: 'teacher',
        password: 'Password123!',
      })
      .expect(201); // TransformInterceptor returns 201/200

    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.user.role).toBe('TEACHER');
    teacherToken = res.body.data.accessToken;
  });

  // 3. Auth: Đăng nhập Học sinh Lớp 7
  it('/api/auth/login as Student (Nam G7)', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        identifier: 'student_g7',
        password: 'Password123!',
      })
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.user.role).toBe('STUDENT');
    expect(res.body.data.user.studentProfile.grade_level).toBe(7);
    studentToken = res.body.data.accessToken;
  });

  // 4. Auth: Đăng nhập Phụ huynh
  it('/api/auth/login as Parent', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        identifier: 'parent_nam',
        password: 'Password123!',
      })
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.user.role).toBe('PARENT');
    parentToken = res.body.data.accessToken;
  });

  // 5. Danh sách môn học
  it('/api/subjects (GET) with Bearer token', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/subjects')
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(5);
  });

  // 6. Học sinh xem bài học hôm nay
  it('/api/daily-assignments/student/today (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/daily-assignments/student/today')
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(200);

    expect(res.body.success).toBe(true);
    if (res.body.data) {
      expect(res.body.data.learning_units.title).toBeDefined();
      expect(res.body.data.assessment_attempts.length).toBeGreaterThanOrEqual(1);
      sampleAttemptId = res.body.data.assessment_attempts[0].id;
    }
  });

  // 7. Phụ huynh xem tiến độ của con
  it('/api/daily-assignments/parent/children (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/daily-assignments/parent/children')
      .set('Authorization', `Bearer ${parentToken}`)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // 8. Bảo mật: Phụ huynh KHÔNG ĐƯỢC PHÉP nộp bài (RBAC block)
  it('RBAC: Parent cannot submit attempt', async () => {
    if (!sampleAttemptId) return;

    await request(app.getHttpServer())
      .post('/api/attempts/submit')
      .set('Authorization', `Bearer ${parentToken}`)
      .send({
        attemptId: sampleAttemptId,
        answers: [],
        timeSpentSeconds: 100,
      })
      .expect(403);
  });
});

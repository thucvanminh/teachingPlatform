import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GradeAttemptDto } from './dto/grade-attempt.dto';
import { attempt_status } from '@prisma/client';

@Injectable()
export class GradingService {
  constructor(private prisma: PrismaService) {}

  async getPendingSubmissions() {
    return this.prisma.assessment_attempts.findMany({
      where: {
        status: attempt_status.SUBMITTED,
      },
      include: {
        _count: {
          select: { student_answers: true },
        },
        users_assessment_attempts_student_idTousers: {
          select: { id: true, full_name: true, username: true },
        },
        assessments: {
          select: {
            id: true,
            title: true,
            type: true,
            max_score: true,
            _count: { select: { questions: true } },
          },
        },
        daily_student_assignments: {
          select: { id: true, assigned_date: true },
        },
      },
      orderBy: { submitted_at: 'asc' },
    });
  }

  async gradeAttempt(attemptId: string, dto: GradeAttemptDto, teacherId: string) {
    const attempt = await this.prisma.assessment_attempts.findUnique({
      where: { id: attemptId },
      include: {
        student_answers: true,
      },
    });

    if (!attempt) {
      throw new NotFoundException('Không tìm thấy bài làm');
    }

    if (attempt.status === attempt_status.NOT_STARTED || attempt.status === attempt_status.IN_PROGRESS) {
      throw new BadRequestException('Học sinh chưa nộp bài này, không thể chấm điểm');
    }

    let additionalManualScore = 0;

    return this.prisma.$transaction(async (tx) => {
      // 1. Cập nhật điểm và lời phê cho từng câu tự luận
      for (const gradeItem of dto.grades) {
        additionalManualScore += Number(gradeItem.awardedPoints);

        await tx.student_answers.updateMany({
          where: {
            attempt_id: attemptId,
            question_id: gradeItem.questionId,
          },
          data: {
            awarded_points: gradeItem.awardedPoints,
            is_correct: gradeItem.awardedPoints > 0,
            teacher_comment: gradeItem.teacherComment || null,
            annotated_image_url: gradeItem.annotatedImageUrl || null,
            updated_at: new Date(),
          },
        });
      }

      const autoScore = Number(attempt.auto_score || 0);
      const totalScore = autoScore + additionalManualScore;

      // 2. Cập nhật attempt thành GRADED
      const updated = await tx.assessment_attempts.update({
        where: { id: attemptId },
        data: {
          manual_score: additionalManualScore,
          total_score: totalScore,
          overall_feedback: dto.overallFeedback || null,
          graded_by: teacherId,
          graded_at: new Date(),
          status: attempt_status.GRADED,
        },
        include: {
          student_answers: true,
        },
      });

      return updated;
    });
  }
}

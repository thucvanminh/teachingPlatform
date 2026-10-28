import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { user_role } from '@prisma/client';

@Injectable()
export class AssessmentsService {
  constructor(private prisma: PrismaService) {}

  async createAssessment(dto: CreateAssessmentDto) {
    return this.prisma.assessments.create({
      data: {
        learning_unit_id: dto.learningUnitId,
        type: dto.type,
        title: dto.title,
        instructions: dto.instructions || null,
        time_limit_minutes: dto.timeLimitMinutes || null,
        max_score: dto.maxScore || 10.0,
      },
    });
  }

  async findOne(id: string, requesterRole: user_role) {
    const assessment = await this.prisma.assessments.findUnique({
      where: { id },
      include: {
        learning_units: {
          select: { id: true, title: true, subject_id: true },
        },
        questions: {
          orderBy: { order_index: 'asc' },
          include: {
            other_questions: {
              orderBy: { order_index: 'asc' },
            },
          },
        },
      },
    });

    if (!assessment) {
      throw new NotFoundException('Không tìm thấy đề bài tập');
    }

    // Bảo mật: Nếu học sinh hoặc phụ huynh đang xem đề thi (chưa hoàn thành),
    // tuyệt đối KHÔNG trả về grading_key_payload (đáp án máy chấm)
    if (requesterRole !== user_role.TEACHER) {
      assessment.questions = assessment.questions.map((q) => {
        const { grading_key_payload, ...safeQuestion } = q;
        if (safeQuestion.other_questions) {
          safeQuestion.other_questions = safeQuestion.other_questions.map((subQ) => {
            const { grading_key_payload: subKey, ...safeSubQ } = subQ;
            return safeSubQ as any;
          });
        }
        return safeQuestion as any;
      });
    }

    return assessment;
  }

  async deleteAssessment(id: string) {
    return this.prisma.assessments.delete({
      where: { id },
    });
  }

  async createQuestion(dto: CreateQuestionDto) {
    return this.prisma.questions.create({
      data: {
        assessment_id: dto.assessmentId,
        parent_question_id: dto.parentQuestionId || null,
        order_index: dto.orderIndex ?? 0,
        type: dto.type,
        points: dto.points ?? 1.0,
        question_payload: dto.questionPayload,
        grading_key_payload: dto.gradingKeyPayload || {},
      },
    });
  }

  async updateQuestion(id: string, data: any) {
    return this.prisma.questions.update({
      where: { id },
      data,
    });
  }

  async deleteQuestion(id: string) {
    return this.prisma.questions.delete({
      where: { id },
    });
  }
}

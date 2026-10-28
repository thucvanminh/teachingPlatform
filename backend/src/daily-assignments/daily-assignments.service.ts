import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDailyAssignmentDto } from './dto/create-daily-assignment.dto';
import { attempt_status } from '@prisma/client';

@Injectable()
export class DailyAssignmentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDailyAssignmentDto, teacherId: string) {
    const assignedDate = new Date(dto.assignedDate);

    // 1. Kiểm tra bài học tồn tại
    const unit = await this.prisma.learning_units.findUnique({
      where: { id: dto.learningUnitId },
      include: { assessments: true },
    });
    if (!unit) {
      throw new NotFoundException('Không tìm thấy bài học');
    }

    // 2. Kiểm tra xem ngày hôm đó học sinh đã được giao bài này chưa
    const existing = await this.prisma.daily_student_assignments.findUnique({
      where: {
        student_id_learning_unit_id_assigned_date: {
          student_id: dto.studentId,
          learning_unit_id: dto.learningUnitId,
          assigned_date: assignedDate,
        },
      },
    });
    if (existing) {
      throw new BadRequestException('Học sinh này đã được giao bài học này trong ngày được chọn');
    }

    // 3. Tạo assignment và tự động khởi tạo các slot attempt tương ứng cho các assessment trong bài
    return this.prisma.$transaction(async (tx) => {
      const assignment = await tx.daily_student_assignments.create({
        data: {
          student_id: dto.studentId,
          learning_unit_id: dto.learningUnitId,
          assigned_by: teacherId,
          assigned_date: assignedDate,
          custom_session_minutes: dto.customSessionMinutes || 90,
          homework_due_at: dto.homeworkDueAt ? new Date(dto.homeworkDueAt) : null,
          teacher_daily_note: dto.teacherDailyNote || null,
        },
      });

      // Tạo sẵn các attempt ở trạng thái NOT_STARTED cho từng assessment (90m và Homework)
      for (const assessment of unit.assessments) {
        await tx.assessment_attempts.create({
          data: {
            daily_assignment_id: assignment.id,
            assessment_id: assessment.id,
            student_id: dto.studentId,
            status: attempt_status.NOT_STARTED,
          },
        });
      }

      return assignment;
    });
  }

  async getTodayForStudent(studentId: string) {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const assignment = await this.prisma.daily_student_assignments.findFirst({
      where: {
        student_id: studentId,
        assigned_date: today,
        is_published: true,
      },
      include: {
        learning_units: {
          include: {
            subjects: true,
          },
        },
        assessment_attempts: {
          include: {
            assessments: {
              select: {
                id: true,
                type: true,
                title: true,
                time_limit_minutes: true,
                max_score: true,
              },
            },
          },
        },
      },
    });

    return assignment;
  }

  async getAllForStudent(studentId: string) {
    return this.prisma.daily_student_assignments.findMany({
      where: {
        student_id: studentId,
        is_published: true,
      },
      include: {
        learning_units: {
          include: { subjects: true },
        },
        assessment_attempts: {
          include: {
            assessments: {
              select: { id: true, type: true, title: true, max_score: true },
            },
          },
        },
      },
      orderBy: { assigned_date: 'desc' },
    });
  }

  async getForParent(parentId: string) {
    // 1. Lấy danh sách con của phụ huynh
    const links = await this.prisma.parent_student_links.findMany({
      where: { parent_id: parentId },
      select: { student_id: true },
    });
    const studentIds = links.map((l) => l.student_id);

    return this.prisma.daily_student_assignments.findMany({
      where: {
        student_id: { in: studentIds },
        is_published: true,
      },
      include: {
        users_daily_student_assignments_student_idTousers: {
          select: { id: true, full_name: true, username: true },
        },
        learning_units: {
          include: { subjects: true },
        },
        assessment_attempts: {
          include: {
            assessments: {
              select: { id: true, type: true, title: true, max_score: true },
            },
          },
        },
      },
      orderBy: { assigned_date: 'desc' },
    });
  }

  async getAllForTeacher() {
    return this.prisma.daily_student_assignments.findMany({
      include: {
        users_daily_student_assignments_student_idTousers: {
          select: { id: true, full_name: true, username: true },
        },
        learning_units: {
          include: { subjects: true },
        },
        assessment_attempts: {
          include: {
            assessments: {
              select: { id: true, type: true, title: true, max_score: true },
            },
          },
        },
      },
      orderBy: { assigned_date: 'desc' },
    });
  }

  async markLectureViewed(assignmentId: string, studentId: string) {
    const assignment = await this.prisma.daily_student_assignments.findUnique({
      where: { id: assignmentId },
    });

    if (!assignment || assignment.student_id !== studentId) {
      throw new NotFoundException('Không tìm thấy buổi học');
    }

    if (!assignment.lecture_viewed_at) {
      return this.prisma.daily_student_assignments.update({
        where: { id: assignmentId },
        data: { lecture_viewed_at: new Date() },
      });
    }

    return assignment;
  }
}

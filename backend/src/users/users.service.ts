import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { LinkParentDto } from './dto/link-parent.dto';
import { user_role, ui_mode } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAllStudents() {
    return this.prisma.users.findMany({
      where: { role: user_role.STUDENT },
      select: {
        id: true,
        username: true,
        full_name: true,
        is_active: true,
        created_at: true,
        student_profiles: true,
        parent_student_links_parent_student_links_student_idTousers: {
          include: {
            users_parent_student_links_parent_idTousers: {
              select: {
                id: true,
                username: true,
                full_name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async createStudent(dto: CreateStudentDto) {
    const existing = await this.prisma.users.findUnique({
      where: { username: dto.username },
    });
    if (existing) {
      throw new BadRequestException('Tên đăng nhập đã tồn tại');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    let defaultTheme: ui_mode = ui_mode.STANDARD_SECONDARY;
    if (dto.gradeLevel <= 5) {
      defaultTheme = ui_mode.KIDS_ELEMENTARY;
    } else if (dto.gradeLevel >= 10) {
      defaultTheme = ui_mode.HIGH_SCHOOL_EXAM;
    }

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.users.create({
        data: {
          username: dto.username,
          password_hash: passwordHash,
          full_name: dto.fullName,
          role: user_role.STUDENT,
        },
      });

      const profile = await tx.student_profiles.create({
        data: {
          user_id: user.id,
          grade_level: dto.gradeLevel,
          ui_theme: dto.uiTheme || defaultTheme,
          default_session_minutes: dto.defaultSessionMinutes || 90,
          tutor_private_notes: dto.tutorPrivateNotes || null,
        },
      });

      return {
        id: user.id,
        username: user.username,
        fullName: user.full_name,
        role: user.role,
        profile,
      };
    });
  }

  async linkParent(dto: LinkParentDto) {
    // 1. Kiểm tra parent tồn tại và đúng role
    const parent = await this.prisma.users.findUnique({
      where: { id: dto.parentId },
    });
    if (!parent || parent.role !== user_role.PARENT) {
      throw new BadRequestException('Tài khoản phụ huynh không hợp lệ');
    }

    // 2. Kiểm tra student tồn tại và đúng role
    const student = await this.prisma.users.findUnique({
      where: { id: dto.studentId },
    });
    if (!student || student.role !== user_role.STUDENT) {
      throw new BadRequestException('Tài khoản học sinh không hợp lệ');
    }

    // 3. Tạo link
    return this.prisma.parent_student_links.upsert({
      where: {
        parent_id_student_id: {
          parent_id: dto.parentId,
          student_id: dto.studentId,
        },
      },
      update: {
        relationship: dto.relationship || 'Parent',
      },
      create: {
        parent_id: dto.parentId,
        student_id: dto.studentId,
        relationship: dto.relationship || 'Parent',
      },
    });
  }

  async getChildrenForParent(parentId: string) {
    const links = await this.prisma.parent_student_links.findMany({
      where: { parent_id: parentId },
      include: {
        users_parent_student_links_student_idTousers: {
          select: {
            id: true,
            username: true,
            full_name: true,
            student_profiles: true,
          },
        },
      },
    });

    return links.map((link) => ({
      relationship: link.relationship,
      student: link.users_parent_student_links_student_idTousers,
    }));
  }

  async updateTutorNotes(studentId: string, notes: string) {
    const profile = await this.prisma.student_profiles.findUnique({
      where: { user_id: studentId },
    });
    if (!profile) {
      throw new NotFoundException('Không tìm thấy học sinh');
    }

    return this.prisma.student_profiles.update({
      where: { user_id: studentId },
      data: { tutor_private_notes: notes },
    });
  }
}

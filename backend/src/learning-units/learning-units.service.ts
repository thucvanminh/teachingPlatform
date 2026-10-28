import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLearningUnitDto } from './dto/create-learning-unit.dto';
import { UpdateLearningUnitDto } from './dto/update-learning-unit.dto';

@Injectable()
export class LearningUnitsService {
  constructor(private prisma: PrismaService) {}

  async findAll(subjectId?: string) {
    return this.prisma.learning_units.findMany({
      where: subjectId ? { subject_id: subjectId } : undefined,
      include: {
        subjects: {
          select: { id: true, code: true, name: true, target_grade: true },
        },
        assessments: {
          select: { id: true, type: true, title: true, max_score: true },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: string) {
    const unit = await this.prisma.learning_units.findUnique({
      where: { id },
      include: {
        subjects: true,
        assessments: {
          include: {
            questions: {
              orderBy: { order_index: 'asc' },
            },
          },
        },
      },
    });

    if (!unit) {
      throw new NotFoundException('Không tìm thấy bài học');
    }

    return unit;
  }

  async create(dto: CreateLearningUnitDto, teacherId: string) {
    return this.prisma.learning_units.create({
      data: {
        subject_id: dto.subjectId,
        created_by: teacherId,
        title: dto.title,
        description: dto.description || null,
        lecture_content_markdown: dto.lectureContentMarkdown || null,
        lecture_attachments: dto.lectureAttachments || [],
        is_template: dto.isTemplate ?? true,
      },
    });
  }

  async update(id: string, dto: UpdateLearningUnitDto) {
    await this.findOne(id);

    return this.prisma.learning_units.update({
      where: { id },
      data: {
        subject_id: dto.subjectId,
        title: dto.title,
        description: dto.description,
        lecture_content_markdown: dto.lectureContentMarkdown,
        lecture_attachments: dto.lectureAttachments,
        is_template: dto.isTemplate,
        updated_at: new Date(),
      },
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.learning_units.delete({
      where: { id },
    });
  }
}

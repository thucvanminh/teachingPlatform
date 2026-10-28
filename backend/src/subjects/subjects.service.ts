import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.subjects.findMany({
      orderBy: { target_grade: 'asc' },
    });
  }

  async findOne(id: string) {
    const subject = await this.prisma.subjects.findUnique({
      where: { id },
      include: {
        learning_units: true,
      },
    });
    if (!subject) {
      throw new NotFoundException('Không tìm thấy môn học');
    }
    return subject;
  }

  async create(dto: CreateSubjectDto) {
    const existing = await this.prisma.subjects.findUnique({
      where: { code: dto.code },
    });
    if (existing) {
      throw new BadRequestException('Mã môn học đã tồn tại');
    }

    return this.prisma.subjects.create({
      data: {
        code: dto.code,
        name: dto.name,
        target_grade: dto.targetGrade,
        enable_latex: dto.enableLatex,
      },
    });
  }
}

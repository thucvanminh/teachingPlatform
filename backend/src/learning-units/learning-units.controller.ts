import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { LearningUnitsService } from './learning-units.service';
import { CreateLearningUnitDto } from './dto/create-learning-unit.dto';
import { UpdateLearningUnitDto } from './dto/update-learning-unit.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { user_role } from '@prisma/client';

@ApiTags('Learning Units (Curriculum & Lectures)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('learning-units')
export class LearningUnitsController {
  constructor(private readonly learningUnitsService: LearningUnitsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả các bài học (có thể lọc theo môn học)' })
  @ApiQuery({ name: 'subjectId', required: false })
  async findAll(@Query('subjectId') subjectId?: string) {
    return this.learningUnitsService.findAll(subjectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Xem chi tiết bài học (Lý thuyết, bài tập 90p và BTVN)' })
  async findOne(@Param('id') id: string) {
    return this.learningUnitsService.findOne(id);
  }

  @Post()
  @Roles(user_role.TEACHER)
  @ApiOperation({ summary: 'Tạo bài học mới (Chỉ giáo viên)' })
  async create(
    @Body() dto: CreateLearningUnitDto,
    @CurrentUser('id') teacherId: string,
  ) {
    return this.learningUnitsService.create(dto, teacherId);
  }

  @Put(':id')
  @Roles(user_role.TEACHER)
  @ApiOperation({ summary: 'Cập nhật nội dung bài học (Chỉ giáo viên)' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateLearningUnitDto,
  ) {
    return this.learningUnitsService.update(id, dto);
  }

  @Delete(':id')
  @Roles(user_role.TEACHER)
  @ApiOperation({ summary: 'Xóa bài học (Chỉ giáo viên)' })
  async delete(@Param('id') id: string) {
    return this.learningUnitsService.delete(id);
  }
}

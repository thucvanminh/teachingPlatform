import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { user_role } from '@prisma/client';

@ApiTags('Assessments & Questions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Post()
  @Roles(user_role.TEACHER)
  @ApiOperation({ summary: 'Tạo đề bài tập mới (90 phút hoặc BTVN) - Chỉ giáo viên' })
  async createAssessment(@Body() dto: CreateAssessmentDto) {
    return this.assessmentsService.createAssessment(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy đề bài tập kèm các câu hỏi (Học sinh sẽ được ẩn đáp án)' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser('role') role: user_role,
  ) {
    return this.assessmentsService.findOne(id, role);
  }

  @Delete(':id')
  @Roles(user_role.TEACHER)
  @ApiOperation({ summary: 'Xóa đề bài tập (Chỉ giáo viên)' })
  async deleteAssessment(@Param('id') id: string) {
    return this.assessmentsService.deleteAssessment(id);
  }

  @Post('questions')
  @Roles(user_role.TEACHER)
  @ApiOperation({ summary: 'Thêm câu hỏi vào đề (Trắc nghiệm, tự luận, điền từ, đọc hiểu)' })
  async createQuestion(@Body() dto: CreateQuestionDto) {
    return this.assessmentsService.createQuestion(dto);
  }

  @Put('questions/:id')
  @Roles(user_role.TEACHER)
  @ApiOperation({ summary: 'Cập nhật câu hỏi (Chỉ giáo viên)' })
  async updateQuestion(@Param('id') id: string, @Body() data: any) {
    return this.assessmentsService.updateQuestion(id, data);
  }

  @Delete('questions/:id')
  @Roles(user_role.TEACHER)
  @ApiOperation({ summary: 'Xóa câu hỏi khỏi đề (Chỉ giáo viên)' })
  async deleteQuestion(@Param('id') id: string) {
    return this.assessmentsService.deleteQuestion(id);
  }
}

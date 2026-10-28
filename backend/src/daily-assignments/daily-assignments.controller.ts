import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DailyAssignmentsService } from './daily-assignments.service';
import { CreateDailyAssignmentDto } from './dto/create-daily-assignment.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { user_role } from '@prisma/client';

@ApiTags('Daily Assignments (Personalized Schedule)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('daily-assignments')
export class DailyAssignmentsController {
  constructor(private readonly assignmentsService: DailyAssignmentsService) {}

  @Post()
  @Roles(user_role.TEACHER)
  @ApiOperation({ summary: 'Giao bài học hàng ngày cho học sinh (Chỉ giáo viên)' })
  async create(
    @Body() dto: CreateDailyAssignmentDto,
    @CurrentUser('id') teacherId: string,
  ) {
    return this.assignmentsService.create(dto, teacherId);
  }

  @Get('student/today')
  @Roles(user_role.STUDENT)
  @ApiOperation({ summary: 'Lấy bài học của ngày hôm nay cho học sinh đang đăng nhập' })
  async getTodayForStudent(@CurrentUser('id') studentId: string) {
    return this.assignmentsService.getTodayForStudent(studentId);
  }

  @Get('student/all')
  @Roles(user_role.STUDENT)
  @ApiOperation({ summary: 'Lấy toàn bộ lộ trình và lịch sử bài tập của học sinh' })
  async getAllForStudent(@CurrentUser('id') studentId: string) {
    return this.assignmentsService.getAllForStudent(studentId);
  }

  @Get('parent/children')
  @Roles(user_role.PARENT)
  @ApiOperation({ summary: 'Phụ huynh xem tiến độ học tập và bài tập của con' })
  async getForParent(@CurrentUser('id') parentId: string) {
    return this.assignmentsService.getForParent(parentId);
  }

  @Get('teacher/all')
  @Roles(user_role.TEACHER)
  @ApiOperation({ summary: 'Giáo viên xem toàn bộ danh sách phân phối bài học' })
  async getAllForTeacher() {
    return this.assignmentsService.getAllForTeacher();
  }

  @Patch(':id/view-lecture')
  @Roles(user_role.STUDENT)
  @ApiOperation({ summary: 'Ghi nhận học sinh đã mở xem bài giảng lý thuyết' })
  async markLectureViewed(
    @Param('id') assignmentId: string,
    @CurrentUser('id') studentId: string,
  ) {
    return this.assignmentsService.markLectureViewed(assignmentId, studentId);
  }
}

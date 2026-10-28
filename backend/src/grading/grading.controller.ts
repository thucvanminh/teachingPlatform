import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GradingService } from './grading.service';
import { GradeAttemptDto } from './dto/grade-attempt.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { user_role } from '@prisma/client';

@ApiTags('Teacher Grading Studio')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('grading')
export class GradingController {
  constructor(private readonly gradingService: GradingService) {}

  @Get('pending')
  @Roles(user_role.TEACHER)
  @ApiOperation({ summary: 'Lấy danh sách các bài làm đang chờ giáo viên chấm tự luận' })
  async getPendingSubmissions() {
    return this.gradingService.getPendingSubmissions();
  }

  @Post(':attemptId')
  @Roles(user_role.TEACHER)
  @ApiOperation({ summary: 'Chấm điểm tự luận, nhập nhận xét và đính kèm ảnh chấm chữa' })
  async gradeAttempt(
    @Param('attemptId') attemptId: string,
    @Body() dto: GradeAttemptDto,
    @CurrentUser('id') teacherId: string,
  ) {
    return this.gradingService.gradeAttempt(attemptId, dto, teacherId);
  }
}

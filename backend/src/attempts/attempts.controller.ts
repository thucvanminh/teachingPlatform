import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AttemptsService } from './attempts.service';
import { SubmitAttemptDto } from './dto/submit-attempt.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { user_role } from '@prisma/client';

@ApiTags('Assessment Attempts & Submissions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('attempts')
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) {}

  @Post(':id/start')
  @Roles(user_role.STUDENT)
  @ApiOperation({ summary: 'Bắt đầu làm bài (khởi động bộ đếm thời gian thực tế)' })
  async startAttempt(
    @Param('id') attemptId: string,
    @CurrentUser('id') studentId: string,
  ) {
    return this.attemptsService.startAttempt(attemptId, studentId);
  }

  @Post('submit')
  @Roles(user_role.STUDENT)
  @ApiOperation({ summary: 'Nộp bài làm (Tự động chấm trắc nghiệm & lưu bài làm tự luận)' })
  async submitAttempt(
    @Body() dto: SubmitAttemptDto,
    @CurrentUser('id') studentId: string,
  ) {
    return this.attemptsService.submitAttempt(dto, studentId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Xem kết quả chi tiết, câu trả lời và lời phê của giáo viên' })
  async getAttemptDetails(
    @Param('id') attemptId: string,
    @CurrentUser() user: { id: string; role: user_role },
  ) {
    return this.attemptsService.getAttemptDetails(attemptId, user);
  }
}

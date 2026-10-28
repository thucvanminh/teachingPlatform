import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsString, IsOptional, IsInt, IsDateString } from 'class-validator';

export class CreateDailyAssignmentDto {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'ID học sinh nhận bài' })
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ example: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', description: 'ID bài học được giao' })
  @IsUUID()
  @IsNotEmpty()
  learningUnitId: string;

  @ApiProperty({ example: '2026-10-28', description: 'Ngày học (YYYY-MM-DD)' })
  @IsDateString()
  @IsNotEmpty()
  assignedDate: string;

  @ApiPropertyOptional({ example: 90, description: 'Thời lượng buổi học (phút)' })
  @IsOptional()
  @IsInt()
  customSessionMinutes?: number;

  @ApiPropertyOptional({ example: '2026-10-30T23:59:59Z', description: 'Hạn chót nộp BTVN' })
  @IsOptional()
  @IsDateString()
  homeworkDueAt?: string;

  @ApiPropertyOptional({ example: 'Hôm nay thầy trò mình sẽ học kỹ dạng toán tìm x và luyện 5 bài tập.' })
  @IsOptional()
  @IsString()
  teacherDailyNote?: string;
}

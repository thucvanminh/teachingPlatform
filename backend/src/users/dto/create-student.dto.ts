import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsInt, Min, Max, IsEnum, MinLength } from 'class-validator';
import { ui_mode } from '@prisma/client';

export class CreateStudentDto {
  @ApiProperty({ example: 'student_mai' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '123456', description: 'Mật khẩu hoặc mã PIN đơn giản cho bé lớp 2' })
  @IsString()
  @MinLength(4)
  password: string;

  @ApiProperty({ example: 'Trần Thị Mai' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 2, description: 'Khối lớp từ 1 đến 12' })
  @IsInt()
  @Min(1)
  @Max(12)
  gradeLevel: number;

  @ApiPropertyOptional({ enum: ui_mode, default: ui_mode.STANDARD_SECONDARY })
  @IsOptional()
  @IsEnum(ui_mode)
  uiTheme?: ui_mode;

  @ApiPropertyOptional({ example: 90 })
  @IsOptional()
  @IsInt()
  defaultSessionMinutes?: number;

  @ApiPropertyOptional({ example: 'Bé tiếp thu nhanh, cần chú ý tính toán cẩn thận' })
  @IsOptional()
  @IsString()
  tutorPrivateNotes?: string;
}

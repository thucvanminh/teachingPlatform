import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, IsEmail, IsInt, Min, Max } from 'class-validator';
import { user_role, ui_mode } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({ example: 'student_nam' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiPropertyOptional({ example: 'nam@gmail.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Nguyễn Văn Nam' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ enum: user_role, example: user_role.STUDENT })
  @IsEnum(user_role)
  role: user_role;

  @ApiPropertyOptional({ example: 7, description: 'Bắt buộc nếu role là STUDENT' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  gradeLevel?: number;

  @ApiPropertyOptional({ enum: ui_mode, default: ui_mode.STANDARD_SECONDARY })
  @IsOptional()
  @IsEnum(ui_mode)
  uiTheme?: ui_mode;
}

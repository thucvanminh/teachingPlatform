import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsEnum, IsOptional, IsInt, IsNumber } from 'class-validator';
import { assessment_type } from '@prisma/client';

export class CreateAssessmentDto {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' })
  @IsUUID()
  @IsNotEmpty()
  learningUnitId: string;

  @ApiProperty({ enum: assessment_type, example: assessment_type.IN_SESSION_90M })
  @IsEnum(assessment_type)
  type: assessment_type;

  @ApiProperty({ example: 'Bài tập trên lớp (90 phút)' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Học sinh làm trực tiếp trên web, tính giờ 90 phút' })
  @IsOptional()
  @IsString()
  instructions?: string;

  @ApiPropertyOptional({ example: 90, description: 'Giới hạn thời gian (phút)' })
  @IsOptional()
  @IsInt()
  timeLimitMinutes?: number;

  @ApiPropertyOptional({ example: 10.0, default: 10.0 })
  @IsOptional()
  @IsNumber()
  maxScore?: number;
}

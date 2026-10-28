import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsArray, ValidateNested, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GradeQuestionItemDto {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' })
  @IsUUID()
  @IsNotEmpty()
  questionId: string;

  @ApiProperty({ example: 2.0, description: 'Điểm giáo viên chấm cho câu tự luận này' })
  @IsNumber()
  @Min(0)
  awardedPoints: number;

  @ApiPropertyOptional({ example: 'Bước 2 giải đúng, nhưng kết luận chưa ghi đơn vị.' })
  @IsOptional()
  @IsString()
  teacherComment?: string;

  @ApiPropertyOptional({
    example: 'https://.../supabase/storage/v1/object/public/submissions/marked_p1.webp',
    description: 'Ảnh bài làm học sinh đã được giáo viên khoanh đỏ/chấm chữa',
  })
  @IsOptional()
  @IsString()
  annotatedImageUrl?: string;
}

export class GradeAttemptDto {
  @ApiProperty({ type: [GradeQuestionItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GradeQuestionItemDto)
  grades: GradeQuestionItemDto[];

  @ApiPropertyOptional({ example: 'Hôm nay con làm bài tập trung, phần tự luận tiến bộ rõ rệt!' })
  @IsOptional()
  @IsString()
  overallFeedback?: string;
}

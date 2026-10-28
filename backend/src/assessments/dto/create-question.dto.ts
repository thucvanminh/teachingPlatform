import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsEnum, IsOptional, IsInt, IsNumber } from 'class-validator';
import { question_type } from '@prisma/client';

export class CreateQuestionDto {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' })
  @IsUUID()
  @IsNotEmpty()
  assessmentId: string;

  @ApiPropertyOptional({ example: null, description: 'ID câu hỏi cha nếu nằm trong bài đọc/nghe' })
  @IsOptional()
  @IsUUID()
  parentQuestionId?: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  orderIndex?: number;

  @ApiProperty({ enum: question_type, example: question_type.MULTIPLE_CHOICE })
  @IsEnum(question_type)
  type: question_type;

  @ApiPropertyOptional({ example: 1.0 })
  @IsOptional()
  @IsNumber()
  points?: number;

  @ApiProperty({
    example: {
      content_markdown: 'Tính: $2x + 5 = 15$',
      options: [
        { id: 'A', text: 'x = 5' },
        { id: 'B', text: 'x = 10' },
      ],
    },
  })
  @IsNotEmpty()
  questionPayload: any;

  @ApiPropertyOptional({
    example: {
      correct_option_id: 'A',
      explanation_markdown: '$2x = 10 \\Rightarrow x = 5$',
    },
  })
  @IsOptional()
  gradingKeyPayload?: any;
}

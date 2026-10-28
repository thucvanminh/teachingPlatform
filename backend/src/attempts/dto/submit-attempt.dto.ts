import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsArray, ValidateNested, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class AnswerItemDto {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' })
  @IsUUID()
  @IsNotEmpty()
  questionId: string;

  @ApiProperty({
    example: {
      selected_option_id: 'B', // cho trắc nghiệm
      // hoặc text_response / image_urls cho tự luận
    },
  })
  @IsNotEmpty()
  answerPayload: any;
}

export class SubmitAttemptDto {
  @ApiProperty({ example: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22' })
  @IsUUID()
  @IsNotEmpty()
  attemptId: string;

  @ApiProperty({ type: [AnswerItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerItemDto)
  answers: AnswerItemDto[];

  @ApiProperty({ example: 3400, description: 'Thời gian làm bài thực tế tính bằng giây' })
  @IsInt()
  @Min(0)
  timeSpentSeconds: number;
}

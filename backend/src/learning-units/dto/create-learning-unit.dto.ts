import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class CreateLearningUnitDto {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' })
  @IsUUID()
  @IsNotEmpty()
  subjectId: string;

  @ApiProperty({ example: 'Buổi 1: Số nguyên & Các phép tính' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Ôn tập quy tắc dấu và thứ tự thực hiện phép tính' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '# Lý thuyết Số Nguyên\nSố nguyên bao gồm...' })
  @IsOptional()
  @IsString()
  lectureContentMarkdown?: string;

  @ApiPropertyOptional({
    example: [{ name: 'Ghi chú bài giảng.pdf', url: 'https://...', type: 'pdf' }],
  })
  @IsOptional()
  @IsArray()
  lectureAttachments?: any[];

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isTemplate?: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min, Max, IsBoolean } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({ example: 'MATH_7' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'Toán 7' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 7 })
  @IsInt()
  @Min(1)
  @Max(12)
  targetGrade: number;

  @ApiProperty({ example: true, description: 'Bật bộ gõ công thức KaTeX/LaTeX' })
  @IsBoolean()
  enableLatex: boolean;
}

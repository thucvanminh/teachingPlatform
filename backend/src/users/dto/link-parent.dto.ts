import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';

export class LinkParentDto {
  @ApiProperty({ example: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'ID tài khoản Phụ huynh' })
  @IsUUID()
  @IsNotEmpty()
  parentId: string;

  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', description: 'ID tài khoản Học sinh' })
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @ApiPropertyOptional({ example: 'Mẹ', default: 'Parent' })
  @IsOptional()
  @IsString()
  relationship?: string;
}

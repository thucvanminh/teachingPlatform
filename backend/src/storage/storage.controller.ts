import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { StorageService } from './storage.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class RequestUploadUrlDto {
  @ApiProperty({ enum: ['submissions', 'lectures'], example: 'submissions' })
  @IsIn(['submissions', 'lectures'])
  @IsNotEmpty()
  bucket: 'submissions' | 'lectures';

  @ApiProperty({ example: 'students/bai_tap_1.webp' })
  @IsString()
  @IsNotEmpty()
  fileName: string;
}

@ApiTags('File Storage')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload-url')
  @ApiOperation({ summary: 'Tạo Signed Upload URL để tải file trực tiếp lên Supabase Storage' })
  async getUploadUrl(@Body() dto: RequestUploadUrlDto) {
    const timestamp = Date.now();
    const sanitizedName = dto.fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = `${timestamp}_${sanitizedName}`;

    return this.storageService.createSignedUploadUrl(dto.bucket, filePath);
  }
}

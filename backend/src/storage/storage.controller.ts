import { Controller, Post, Body, UseGuards, Optional } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { StorageService } from './storage.service';
import { CloudinaryService } from './cloudinary.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { IsNotEmpty, IsString, IsIn, IsOptional } from 'class-validator';

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

export class RequestCloudinaryUploadDto {
  @ApiProperty({ example: 'teaching-platform/models-3d', required: false })
  @IsString()
  @IsOptional()
  folder?: string;

  @ApiProperty({ enum: ['image', 'raw'], example: 'image', required: false })
  @IsIn(['image', 'raw'])
  @IsOptional()
  resourceType?: 'image' | 'raw';
}

@ApiTags('File Storage')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('storage')
export class StorageController {
  constructor(
    private readonly storageService: StorageService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('upload-url')
  @ApiOperation({ summary: 'Tạo Signed Upload URL để tải file trực tiếp lên Supabase Storage' })
  async getUploadUrl(@Body() dto: RequestUploadUrlDto) {
    const timestamp = Date.now();
    const sanitizedName = dto.fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = `${timestamp}_${sanitizedName}`;

    return this.storageService.createSignedUploadUrl(dto.bucket, filePath);
  }

  @Post('cloudinary/upload-params')
  @ApiOperation({ summary: 'Tạo chữ ký bảo mật để tải ảnh hoặc Model 3D (.glb) trực tiếp lên Cloudinary' })
  async getCloudinaryUploadParams(@Body() dto: RequestCloudinaryUploadDto) {
    return this.cloudinaryService.createSignedUploadParams(
      dto.folder || 'teaching-platform/uploads',
      dto.resourceType || 'image',
    );
  }
}

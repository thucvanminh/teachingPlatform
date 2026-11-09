import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor(private configService: ConfigService) {
    const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME', 'techmarketplace');
    const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY', '956926632376424');
    const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET', 'vBndczbYx4Z9eBq-h7Hhi1UMzfk');

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    this.logger.log(`✓ Cloudinary Service initialized for cloud: ${cloudName}`);
  }

  /**
   * Tải ảnh lên Cloudinary (bài giảng, bài nộp học sinh, avatar)
   */
  async uploadImage(
    fileBufferOrPath: string | Buffer,
    folder: string = 'teaching-platform/images',
    publicId?: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const options: any = {
        folder,
        resource_type: 'image',
        use_filename: true,
        unique_filename: true,
        overwrite: true,
      };
      if (publicId) options.public_id = publicId;

      if (typeof fileBufferOrPath === 'string') {
        cloudinary.uploader.upload(fileBufferOrPath, options, (error, result) => {
          if (error) return reject(error);
          resolve(result as UploadApiResponse);
        });
      } else {
        const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
          if (error) return reject(error);
          resolve(result as UploadApiResponse);
        });
        uploadStream.end(fileBufferOrPath);
      }
    });
  }

  /**
   * Tải file Model 3D (.glb, .gltf, .bin) lên Cloudinary (resource_type: raw)
   */
  async upload3DModel(
    fileBufferOrPath: string | Buffer,
    folder: string = 'teaching-platform/models-3d',
    filename?: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const options: any = {
        folder,
        resource_type: 'raw', // Model 3D được lưu trữ dưới dạng raw asset
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };
      if (filename) options.public_id = filename;

      if (typeof fileBufferOrPath === 'string') {
        cloudinary.uploader.upload(fileBufferOrPath, options, (error, result) => {
          if (error) return reject(error);
          resolve(result as UploadApiResponse);
        });
      } else {
        const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
          if (error) return reject(error);
          resolve(result as UploadApiResponse);
        });
        uploadStream.end(fileBufferOrPath);
      }
    });
  }

  /**
   * Tạo chữ ký Signed Upload Parameters để Frontend tải trực tiếp lên Cloudinary
   * mà không cần truyền qua server Backend (tiết kiệm băng thông server)
   */
  createSignedUploadParams(
    folder: string = 'teaching-platform/uploads',
    resourceType: 'image' | 'raw' = 'image',
  ) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET', 'vBndczbYx4Z9eBq-h7Hhi1UMzfk');
    const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY', '956926632376424');
    const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME', 'techmarketplace');

    const paramsToSign: Record<string, any> = {
      folder,
      timestamp,
    };

    const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

    return {
      cloudName,
      apiKey,
      timestamp,
      folder,
      resourceType,
      signature,
      uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    };
  }

  /**
   * Lấy URL ảnh tối ưu (tự động nén WebP/AVIF và chất lượng cao)
   */
  getOptimizedImageUrl(publicId: string, options?: { width?: number; height?: number; crop?: string }): string {
    return cloudinary.url(publicId, {
      fetch_format: 'auto',
      quality: 'auto',
      secure: true,
      ...options,
    });
  }

  /**
   * Lấy URL CDN trực tiếp của Model 3D
   */
  get3DModelUrl(publicId: string): string {
    return cloudinary.url(publicId, {
      resource_type: 'raw',
      secure: true,
    });
  }
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class StorageService {
  private supabase: SupabaseClient;
  private supabaseUrl: string;

  constructor(private configService: ConfigService) {
    this.supabaseUrl = this.configService.get<string>('SUPABASE_URL', 'https://jxikmcvhamcdrsmyoyid.supabase.co');
    const serviceRoleKey = this.configService.get<string>(
      'SUPABASE_SERVICE_ROLE_KEY',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    );
    this.supabase = createClient(this.supabaseUrl, serviceRoleKey);
  }

  async createSignedUploadUrl(bucket: 'submissions' | 'lectures', filePath: string) {
    if (!['submissions', 'lectures'].includes(bucket)) {
      throw new BadRequestException('Tên bucket không hợp lệ');
    }

    // Tạo signed upload URL hợp lệ trong 60 phút
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .createSignedUploadUrl(filePath);

    if (error) {
      throw new BadRequestException(`Lỗi tạo URL upload: ${error.message}`);
    }

    const publicUrl = `${this.supabaseUrl}/storage/v1/object/public/${bucket}/${filePath}`;

    return {
      uploadUrl: data?.signedUrl,
      token: data?.token,
      path: data?.path,
      publicUrl,
    };
  }

  getPublicUrl(bucket: 'submissions' | 'lectures', filePath: string) {
    const { data } = this.supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  }
}

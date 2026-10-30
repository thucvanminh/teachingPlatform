import { Injectable, Logger, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SelfPingService implements OnApplicationBootstrap, OnApplicationShutdown {
  private readonly logger = new Logger(SelfPingService.name);
  private timer: NodeJS.Timeout | null = null;
  private initialPingTimer: NodeJS.Timeout | null = null;

  constructor(private configService: ConfigService) {}

  onApplicationBootstrap() {
    // Lấy URL công khai của backend:
    // 1. Render tự động cung cấp biến môi trường RENDER_EXTERNAL_URL (ví dụ: https://my-app.onrender.com)
    // 2. Hoặc người dùng cấu hình SERVER_URL / BACKEND_URL
    const targetUrl =
      this.configService.get<string>('RENDER_EXTERNAL_URL') ||
      this.configService.get<string>('SERVER_URL') ||
      this.configService.get<string>('BACKEND_URL') ||
      process.env.RENDER_EXTERNAL_URL ||
      process.env.SERVER_URL ||
      process.env.BACKEND_URL;

    const isProd = process.env.NODE_ENV === 'production';

    // Nếu chạy local development và không đặt target URL thì không ping để tránh spam log
    if (!targetUrl && !isProd) {
      this.logger.log('Môi trường Local Development: Tự động tắt cơ chế self-ping.');
      return;
    }

    if (!targetUrl) {
      this.logger.warn(
        '⚠️ Server chạy ở chế độ production nhưng chưa cấu hình RENDER_EXTERNAL_URL hoặc SERVER_URL. Vui lòng thiết lập biến môi trường SERVER_URL=<https://your-domain.com> để kích hoạt tự ping chống sleep.',
      );
      return;
    }

    const healthEndpoint = `${targetUrl.replace(/\/+$/, '')}/health`;
    const PING_INTERVAL = 10 * 60 * 1000; // 10 phút (Render sleep sau 15 phút idle)

    this.logger.log(`🚀 Kích hoạt cơ chế tự ping nội bộ mỗi 10 phút tới: ${healthEndpoint}`);

    // Ping thử 1 lần sau 20 giây khởi động để xác thực đường truyền
    this.initialPingTimer = setTimeout(() => {
      this.pingHealth(healthEndpoint, true);
    }, 20000);

    // Lặp lại định kỳ mỗi 10 phút
    this.timer = setInterval(() => {
      this.pingHealth(healthEndpoint, false);
    }, PING_INTERVAL);
  }

  private async pingHealth(url: string, isInitial = false) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Internal-KeepAlive-Ping/1.0',
        },
      });

      const timeStr = new Date().toLocaleTimeString('vi-VN', { hour12: false });
      if (res.ok) {
        this.logger.log(
          `[Self-Ping] ${isInitial ? 'Khởi tạo thành công' : 'Định kỳ 10p'}: HTTP ${res.status} lúc ${timeStr}`,
        );
      } else {
        this.logger.warn(`[Self-Ping] Cảnh báo: Server trả về HTTP ${res.status} lúc ${timeStr}`);
      }
    } catch (err: any) {
      this.logger.error(`[Self-Ping] Lỗi gửi request ping: ${err.message}`);
    }
  }

  onApplicationShutdown() {
    if (this.initialPingTimer) {
      clearTimeout(this.initialPingTimer);
    }
    if (this.timer) {
      clearInterval(this.timer);
      this.logger.log('Đã dừng timer tự ping.');
    }
  }
}

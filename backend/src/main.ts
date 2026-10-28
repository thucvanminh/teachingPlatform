import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // 1. CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 2. Global Prefix
  app.setGlobalPrefix('api', {
    exclude: ['health'],
  });

  // 3. Global Pipes & Filters
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // 4. Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Teaching Platform LMS API')
    .setDescription('Hệ thống API quản lý học tập cá nhân hóa 1-on-1 (Giáo viên, Học sinh, Phụ huynh)')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 5. Start Server
  const port = process.env.PORT || 3001;
  await app.listen(port);
  logger.log(`Server đang chạy tại http://localhost:${port}`);
  logger.log(`Swagger API Docs: http://localhost:${port}/api/docs`);
}

bootstrap();

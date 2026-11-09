import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { CloudinaryService } from './cloudinary.service';
import { StorageController } from './storage.controller';

@Module({
  controllers: [StorageController],
  providers: [StorageService, CloudinaryService],
  exports: [StorageService, CloudinaryService],
})
export class StorageModule {}

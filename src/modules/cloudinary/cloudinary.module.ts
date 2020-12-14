import { Module } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Module({
  exports: [CloudinaryProvider, CloudinaryService],
  providers: [CloudinaryService, CloudinaryProvider, ConfigService],
})
export class CloudinaryModule {}

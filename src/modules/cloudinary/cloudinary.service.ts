import { Inject, Injectable } from '@nestjs/common';
import { ConfigEnum } from '../config/config.enum';
import { ConfigService } from '../config/config.service';
import { Cloudinary } from './cloudinary.provider';

@Injectable()
export class CloudinaryService {
  private v2: any;
  constructor(
    @Inject(Cloudinary)
    private cloudinary,
    private readonly _configService: ConfigService,
  ) {
    this.cloudinary.config({
      cloud_name: this._configService.get(ConfigEnum.STORAGE_CLOUD_NAME),
      api_key: this._configService.get(ConfigEnum.STORAGE_CLOUD_API_KEY),
      api_secret: this._configService.get(ConfigEnum.STORAGE_CLOUD_API_SECRET),
    });
    this.v2 = cloudinary.v2;
  }
  async upload(file: any) {
    return new Promise((resolve, reject) => {
      this.cloudinary.uploader
        .upload_stream((result, error) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(file.buffer);
    });
  }
}

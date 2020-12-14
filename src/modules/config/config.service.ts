import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevelopment = process.env.NODE_ENV !== 'production';
    if (isDevelopment) {
      const envFilePath = __dirname + '/../../../.env';
      const existsPath = fs.existsSync(envFilePath);
      if (!existsPath) {
        console.log('.env file does not exist');
        process.exit(0);
      }
      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
        POSTGRES_HOST: process.env.POSTGRES_HOST,
        POSTGRES_USER: process.env.POSTGRES_USER,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
        POSTGRES_DB: process.env.POSTGRES_DB,
        JWT_SECRET: process.env.JWT_SECRET,
        MAIL_KEY: process.env.MAIL_KEY,
        BUSINESS_MAIL: process.env.BUSINESS_MAIL,
        STORAGE_CLOUD_NAME: process.env.STORAGE_CLOUD_NAME,
        STORAGE_CLOUD_API_KEY: process.env.STORAGE_CLOUD_API_KEY,
        STORAGE_CLOUD_API_SECRET: process.env.STORAGE_CLOUD_API_SECRET,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}

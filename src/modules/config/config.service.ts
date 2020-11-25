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
        APP_PORT: process.env.APP_PORT,
        POSTGRES_HOST: process.env.POSTGRES_HOST,
        POSTGRES_USER: process.env.POSTGRES_USER,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
        POSTGRES_DB: process.env.POSTGRES_DB,
        JWT_SECRET: process.env.JWT_SECRET,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}

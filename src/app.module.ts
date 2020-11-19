import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigEnum } from './config/config.enum';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static PORT: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.PORT = _configService.get(ConfigEnum.PORT);
  }
}

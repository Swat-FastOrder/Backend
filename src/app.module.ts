import { Module } from '@nestjs/common';
import { ConfigEnum } from './modules/config/config.enum';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MenuCategoryModule } from './modules/menu-category/menu-category.module';
import { MenuDishesModule } from './modules/menu-dishes/menu-dishes.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    MenuCategoryModule,
    MenuDishesModule,
    MulterModule.register({
      dest: './dishes-images',
    }),
  ],
})
export class AppModule {
  static PORT: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.PORT = _configService.get(ConfigEnum.PORT);
  }
}

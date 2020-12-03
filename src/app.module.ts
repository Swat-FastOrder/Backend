import { Module } from '@nestjs/common';
import { ConfigEnum } from './modules/config/config.enum';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MenuCategoryModule } from './modules/menu-category/menu-category.module';
import { OrderModule } from './modules/order/order.module';
import { MenuDishesModule } from './modules/menu-dishes/menu-dishes.module';
import { MulterModule } from '@nestjs/platform-express';
import { TableModule } from './modules/table/table.module';
import { RoleModule } from './modules/role/role.module';
import { SendGridModule } from '@anchan828/nest-sendgrid';

@Module({
  imports: [
    SendGridModule.forRoot({
      apikey: new ConfigService().get(ConfigEnum.MAIL_KEY)
    }),
    ConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    MenuCategoryModule,
    OrderModule,
    TableModule,
    MenuDishesModule,
    RoleModule,
    MulterModule.register({
      dest: './dishes-images',
    }),
    MulterModule.register({
      dest: './avatars',
    }),
  ],
})
export class AppModule {
  static PORT: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.PORT = _configService.get(ConfigEnum.PORT);
  }
}

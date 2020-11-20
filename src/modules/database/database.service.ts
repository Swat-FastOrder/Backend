import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from 'src/modules/config/config.service';
import { ConnectionOptions } from 'typeorm';
import { ConfigEnum } from 'src/modules/config/config.enum';
export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        type: 'postgres',
        host: config.get(ConfigEnum.DB_HOST),
        username: config.get(ConfigEnum.DB_USERNAME),
        password: config.get(ConfigEnum.DB_PASSWORD),
        database: config.get(ConfigEnum.DB_NAME),
        logging: false,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];

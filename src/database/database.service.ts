import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from 'src/config/config.service';
import { ConnectionOptions } from 'typeorm';
import { ConfigEnum } from 'src/config/config.enum';
export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        type: 'postgres',
        host: config.get(ConfigEnum.HOST),
        username: config.get(ConfigEnum.USERNAME),
        password: config.get(ConfigEnum.PASSWORD),
        database: config.get(ConfigEnum.DB_NAME),
        logging: false,
        entities: [__dirname + '/../**/*.entity{.ts}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];

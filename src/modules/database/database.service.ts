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
        host: config.get(ConfigEnum.POSTGRES_HOST),
        username: config.get(ConfigEnum.POSTGRES_USER),
        password: config.get(ConfigEnum.POSTGRES_PASSWORD),
        database: config.get(ConfigEnum.POSTGRES_DB),
        port: config.get(ConfigEnum.POSTGRES_PORT),
        logging: false,
        ssl: {
          rejectUnauthorized: false,
      },
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];

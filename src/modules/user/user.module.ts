import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RoleRepository } from '../role/role.repository';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, RoleRepository])],
  providers: [UserService, ConfigService],
  controllers: [UserController],
})
export class UserModule {}

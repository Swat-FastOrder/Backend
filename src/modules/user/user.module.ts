import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RoleRepository } from '../role/role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, RoleRepository])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}

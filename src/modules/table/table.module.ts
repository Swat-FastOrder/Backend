import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableRepository } from './table.repository';
import { UserRepository } from '../user/user.repository';
import { OrderRepository } from '../order/order.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TableRepository,
      UserRepository,
      OrderRepository,
    ]),
  ],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}

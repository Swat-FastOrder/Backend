import { Module } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailController } from './order-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailRepository } from './order-details.repository';
import { OrderRepository } from '../order/order.repository';
import { UserRepository } from '../user/user.repository';
import { MenuDishesRepository } from '../menu-dishes/menu-dishes.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderDetailRepository,
      OrderRepository,
      UserRepository,
      MenuDishesRepository,
    ]),
  ],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
})
export class OrderDetailModule {}

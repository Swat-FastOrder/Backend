import { ConflictException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MenuDishesRepository } from '../menu-dishes/menu-dishes.repository';
import { OrderRepository } from '../order/order.repository';
import { OrderDetailCreateDto } from './dto/order-detail-create.dto';
import { OrderDetailResponseDto } from './dto/order-details-response.dto';
import { OrderDetail } from './order-detail.entity';
import { OrderDetailRepository } from './order-details.repository';

@Injectable()
export class OrderDetailService {
  constructor(
    private readonly _orderRepository: OrderRepository,
    private readonly _menuDishRepository: MenuDishesRepository,
    private readonly _orderDetailRepository: OrderDetailRepository,
  ) {}

  // TODO add documentation api
  async findAllByOrderId(orderId: number): Promise<OrderDetailResponseDto[]> {
    const order = await this._orderRepository.findOne(orderId);
    if (!order) throw new ConflictException('order_not_found');

    const details = await this._orderDetailRepository.find({
      orderId: orderId,
    });

    return details.map(detail => plainToClass(OrderDetailResponseDto, detail));
  }

  // TODO add documentation api
  async create(orderDetailCreateDto: OrderDetailCreateDto) {
    const order = await this._orderRepository.findOne(
      orderDetailCreateDto.orderId,
    );
    if (!order) throw new ConflictException('order_not_found');

    const menuDish = await this._menuDishRepository.findOne(
      orderDetailCreateDto.menuDishId,
    );
    if (!menuDish) throw new ConflictException('menu_dish_not_found');

    const orderDetail = plainToClass(OrderDetail, orderDetailCreateDto);
    orderDetail.save();
    // TODO define and add response
  }

  // TODO add documentation api
  async remove(id: number) {
    const detail = await this._orderDetailRepository.findOne(id);
    if (!detail) throw new ConflictException('order_detail_not_found');
    detail.remove();
    // TODO define and add response
  }
}

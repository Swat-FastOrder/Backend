import { ConflictException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MenuDishesRepository } from '../menu-dishes/menu-dishes.repository';
import { OrderRepository } from '../order/order.repository';
import { OrderDetailCreateDto } from './dto/order-detail-create.dto';
import { OrderDetailResponseDto } from './dto/order-detail-response.dto';
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
  async findAll({ orderId }): Promise<OrderDetailResponseDto[]> {
    let query = {};

    if (orderId) {
      query = { orderId };
      const order = await this._orderRepository.findOne(orderId);
      if (!order) throw new ConflictException('order_not_found');
    }

    const details = await this._orderDetailRepository.find(query);
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
    orderDetail.price = menuDish.price;
    await orderDetail.save();

    const response = {
      orderDetailId: orderDetail.id,
      menuDishId: menuDish.id,
      name: menuDish.name,
      price: orderDetail.price,
      imageUrl: menuDish.imageUrl,
    };

    return response;
  }

  // TODO add documentation api
  async remove(id: number) {
    const detail = await this._orderDetailRepository.findOne(id);
    if (!detail) throw new ConflictException('order_detail_not_found');
    detail.remove();
    return true;
  }
}

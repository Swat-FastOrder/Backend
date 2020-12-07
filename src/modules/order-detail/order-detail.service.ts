import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { stat } from 'fs';
import { MenuDishesRepository } from '../menu-dishes/menu-dishes.repository';
import { OrderResponseDto } from '../order/dtos/order-response.dto';
import { OrderRepository } from '../order/order.repository';
import { OrderStatus } from '../order/order.status.enum';
import { OrderDetailCreateDto } from './dto/order-detail-create.dto';
import { OrderDetailResponseDto } from './dto/order-detail-response.dto';
import { OrderDetailUpdateDto } from './dto/order-detail-update.dto';
import { OrderDetail } from './order-detail.entity';
import { OrderDetailStatus } from './order-detail.status.enum';
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

  async remove(id: number) {
    const detail = await this._orderDetailRepository.findOne(id);
    if (!detail) throw new ConflictException('order_detail_not_found');
    detail.remove();
    return true;
  }

  async update(orderDetail: OrderDetailUpdateDto): Promise<OrderResponseDto> {

    let detail = await this._orderDetailRepository.findOne(orderDetail.id);
    if(!detail) throw new NotFoundException('order_detail_was_not_found');

    const order = await this._orderRepository.findOne(detail.orderId);

    if (order.status != OrderStatus.PREPARING) throw new ConflictException('order_is_not_preparing_cant_update_detail_status');

    const statuses = Object.values(OrderDetailStatus);

    if(!statuses.includes(orderDetail.status)) throw new ConflictException('status_is_not_allowed');

    detail.status = orderDetail.status;
    detail.save();

    return plainToClass(OrderResponseDto, detail);
  }
}

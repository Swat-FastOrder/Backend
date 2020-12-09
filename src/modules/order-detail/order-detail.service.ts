import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MenuDishesRepository } from '../menu-dishes/menu-dishes.repository';
import { OrderResponseDto } from '../order/dtos/order-response.dto';
import { OrderRepository } from '../order/order.repository';
import { queryBuildEqual } from '../utils/query.build.util';
import { OrderDetailCreateDto } from './dto/order-detail-create.dto';
import { OrderDetailFilterDto } from './dto/order-detail-filter.dto';
import { OrderDetailResponseDto } from './dto/order-detail-response.dto';
import { OrderDetailUpdateDto } from './dto/order-detail-update.dto';
import { OrderDetail } from './order-detail.entity';
import { OrderDetailStatus } from './order-detail.status.enum';
import { OrderDetailWorkflowRepository } from './order-details-workflow.repository';
import { OrderDetailRepository } from './order-details.repository';

@Injectable()
export class OrderDetailService {
  constructor(
    private readonly _orderRepository: OrderRepository,
    private readonly _menuDishRepository: MenuDishesRepository,
    private readonly _orderDetailRepository: OrderDetailRepository,
    private readonly _orderDetailWorkflowRepository: OrderDetailWorkflowRepository,
  ) {}

  async findAll(
    filter: OrderDetailFilterDto,
  ): Promise<OrderDetailResponseDto[]> {
    if (filter.orderId) {
      const order = await this._orderRepository.findOne(filter.orderId);
      if (!order) throw new NotFoundException('order_not_found');
    }
    const orderIdEq = queryBuildEqual('orderId', filter.orderId);
    const statusEq = queryBuildEqual('status', filter.status);

    const details = await this._orderDetailRepository.find({
      where: { ...orderIdEq, ...statusEq },
    });
    return details.map(detail => plainToClass(OrderDetailResponseDto, detail));
  }

  async create(orderDetailCreateDto: OrderDetailCreateDto) {
    const order = await this._orderRepository.findOne(
      orderDetailCreateDto.orderId,
    );
    if (!order) throw new NotFoundException('order_not_found');

    const menuDish = await this._menuDishRepository.findOne(
      orderDetailCreateDto.menuDishId,
    );
    if (!menuDish) throw new NotFoundException('menu_dish_not_found');

    const orderDetail = plainToClass(OrderDetail, orderDetailCreateDto);
    orderDetail.price = menuDish.price;
    orderDetail.dish = menuDish;
    await orderDetail.save();

    this.updateOrderTotals(order.id);

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
    const detail = await this.findOne(id);

    await detail.remove();

    this.updateOrderTotals(detail.orderId);

    return true;
  }

  async update(orderDetail: OrderDetailUpdateDto): Promise<OrderResponseDto> {
    const detail = await this._orderDetailRepository.findOne(orderDetail.id);
    if (!detail) throw new NotFoundException('order_detail_was_not_found');

    const statuses = Object.values(OrderDetailStatus);

    if (!statuses.includes(orderDetail.status))
      throw new ConflictException('status_is_not_allowed');

    detail.status = orderDetail.status;
    detail.save();

    return plainToClass(OrderResponseDto, detail);
  }
  /**
   * This function update total dishes and total price for a given order id
   * @param orderId
   */
  async updateOrderTotals(orderId: number) {
    const order = await this._orderRepository.findOne(orderId);
    const details = await this._orderDetailRepository.find({ orderId });
    const total = details.reduce((total, { price }) => total + price, 0);
    order.totalDishes = details.length;
    order.totalPrice = total;
    await order.save();
  }

  async serve(id: number) {
    return this.updateStatus(id, OrderDetailStatus.SERVED);
  }
  async readyToServe(id: number) {
    return this.updateStatus(id, OrderDetailStatus.READY_TO_SERVE);
  }
  async preparing(id: number) {
    return this.updateStatus(id, OrderDetailStatus.PREPARING);
  }

  private async findOne(id: number) {
    const detail = await this._orderDetailRepository.findOne(id);
    if (!detail) throw new NotFoundException('order_detail_not_found');
    return detail;
  }

  private async isValidWorkflow(
    statusStart: OrderDetailStatus,
    statusEnd: OrderDetailStatus,
  ): Promise<boolean> {
    const workflow = await this._orderDetailWorkflowRepository.findOne({
      statusStart: statusStart,
      statusEnd: statusEnd,
    });
    if (!workflow)
      throw new NotFoundException('order_detail_workflow_not_found');
    return true;
  }

  private async updateStatus(id: number, status: OrderDetailStatus) {
    const detail = await this.findOne(id);
    console.log(
      `Send order detail with id ${id} from ${detail.status} to ${status}`,
    );
    if (await this.isValidWorkflow(detail.status, status)) {
      detail.status = status;
      await detail.save();
      return plainToClass(OrderDetailResponseDto, detail);
    }
  }
}

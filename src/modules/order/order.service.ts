import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Not } from 'typeorm';
import { OrderDetailStatus } from '../order-detail/order-detail.status.enum';
import { OrderDetailRepository } from '../order-detail/order-details.repository';
import { TableRepository } from '../table/table.repository';
import { OrderCreateDto } from './dtos/order-create.dto';
import { OrderFilterDto } from './dtos/order-filter.dto';
import { OrderResponseDto } from './dtos/order-response.dto';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderStatus } from './order.status.enum';

@Injectable()
export class OrderService {
  constructor(
    private readonly _orderRepository: OrderRepository,
    private readonly _tableRepository: TableRepository,
    private readonly _orderDetailRepository: OrderDetailRepository,
  ) {}

  /* eslint-disable @typescript-eslint/no-unused-vars */
  async findAll(filter: OrderFilterDto): Promise<OrderResponseDto[]> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const orders = await this._orderRepository.find();
    return orders.map(o => plainToClass(OrderResponseDto, o));
  }

  async findById(id: number): Promise<OrderResponseDto> {
    const theOrder = await this._orderRepository.findOne(id);
    if (!theOrder) throw new NotFoundException('order_not_found');
    return theOrder;
  }

  async create(newOrder: OrderCreateDto): Promise<OrderResponseDto> {
    const theTable = await this._tableRepository.findOne({
      id: newOrder.tableId,
      isAvailable: true,
    });
    if (!theTable) {
      throw new ConflictException('order_table_not_ready_or_not_found');
    }

    const theOrder = plainToClass(Order, newOrder);

    const orderCreated = await theOrder.save();
    theTable.isAvailable = false;
    theTable.save();
    return plainToClass(OrderResponseDto, orderCreated);
  }

  async delete(id: number) {
    console.log(`Deleting the order ${id}`);
    const order = await this._orderRepository.findOne(id);

    if (!order) throw new NotFoundException('order_was_not_found');

    const details = await this._orderDetailRepository.find({
      where: {
        order: { id },
      },
    });
    if (details.length > 0)
      throw new ConflictException('it_cant_delete_because_order_is_not_empty');
    try {
      await order.remove();
      const theTable = await this._tableRepository.findOne({
        id: order.tableId,
      });
      theTable.isAvailable = true;
      await theTable.save();
      return true;
    } catch (e) {
      console.error('Cant delete the order', e);
    }
    return false;
  }

  async finish(id: number) {
    console.log(`Finishing the order ${id}`);
    const order = await this._orderRepository.findOne(id);

    if (!order) throw new NotFoundException('order_was_not_found');

    const details = await this._orderDetailRepository.find({
      where: {
        order: { id },
        status: Not(OrderDetailStatus.SERVED),
      },
    });
    if (details.length > 0)
      throw new ConflictException(
        'it_cant_finish_because_dishes_pending_to_served',
      );
    try {
      order.status = OrderStatus.FINISHED;
      const theOrder = await order.save();
      const theTable = await this._tableRepository.findOne({
        id: theOrder.tableId,
      });
      theTable.isAvailable = true;
      await theTable.save();
      return plainToClass(OrderResponseDto, theOrder);
    } catch (e) {
      console.error('Cant finish the order', e);
      throw e;
    }
  }

  async sendToKitchen(id: number) {
    console.log(`Sending the order ${id} to kitchen`);
    const order = await this._orderRepository.findOne(id);

    if (!order) throw new NotFoundException('order_was_not_found');

    const details = await this._orderDetailRepository.find({
      where: {
        order: { id },
        status: OrderDetailStatus.ORDERED,
      },
    });
    if (details.length < 1)
      throw new ConflictException('it_cant_ship_because_order_is_empty');
    // Send dishes to kitchen
    details.forEach(od => {
      od.status = OrderDetailStatus.READY_TO_PREPARE;
      od.cycleInKitchen++;
      od.save();
    });

    order.status = OrderStatus.WAITING;
    order.timesInKitchen++;
    order.save();
    return plainToClass(OrderResponseDto, order);
  }
}

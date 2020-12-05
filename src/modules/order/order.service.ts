import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MenuDishesRepository } from '../menu-dishes/menu-dishes.repository';
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
    private readonly _orderDetails: OrderDetailRepository,
  ) {}

  /* eslint-disable @typescript-eslint/no-unused-vars */
  async findAll(filter: OrderFilterDto): Promise<OrderResponseDto[]> {
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
  // TODO Requerimos un update?

  delete(id: number) {
    // TODO: Evaluar que la mesa este libre
    // Tendria que ser un disabled? O aplicar un update?
    // Logico y mantener un control de la cantidad de ordenes se cancelan
    // Cancelación de ordenes con motivo?
    throw new Error('Method not implemented.');
  }

  async sendToKitchen(id: number) {

    let order = await this._orderRepository.findOne(id);

    if(!order) throw new NotFoundException('order_was_not_found');

    if(order.status != OrderStatus.ORDERING ) throw new ConflictException('the_order_was_already_shipped_previously');

    if(order.totalDishes < 1) throw new ConflictException('it_cant_ship_because_order_is_empty');

    order.status = OrderStatus.WAITING;
    order.save();
    return plainToClass(OrderResponseDto, order);
  }
}

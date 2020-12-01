import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { TableRepository } from '../table/table.repository';
import { OrderCreateDto } from './dtos/order-create.dto';
import { OrderFilterDto } from './dtos/order-filter.dto';
import { OrderResponseDto } from './dtos/order-response.dto';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly _orderRepository: OrderRepository,
    private readonly _tableRepository: TableRepository,
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
    // TODO: Evaluar que la mesa este libre
    const theTable = await this._tableRepository.findOne({
      id: newOrder.tableId,
    });
    if (!theTable) {
      throw new ConflictException('order_table_not_ready_or_not_found');
    }

    const theOrder = plainToClass(Order, newOrder);

    return plainToClass(OrderResponseDto, await theOrder.save());
  }
  // TODO Requerimos un update?

  delete(id: number) {
    // TODO: Evaluar que la mesa este libre
    // Tendria que ser un disabled? O aplicar un update?
    // Logico y mantener un control de la cantidad de ordenes se cancelan
    // Cancelación de ordenes con motivo?
    throw new Error('Method not implemented.');
  }
}

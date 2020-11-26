import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { OrderCreateDto } from './dtos/order-create.dto';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly _orderRepository: OrderRepository,
    private readonly _tableRepository: TableRepository,
  ) {}

  findAll() {
    return this._orderRepository.find();
  }
  async findById(id: number) {
    const theOrder = await this._orderRepository.findOne(id);
    if (!theOrder) throw new NotFoundException('order_not_found');
    return theOrder;
  }
  async create(newOrder: OrderCreateDto) {
    // TODO: Evaluar que la mesa este libre

    const theOrder = plainToClass(Order, newOrder);

    return theOrder.save();
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

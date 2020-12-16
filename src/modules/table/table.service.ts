import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Equal, In, Not } from 'typeorm';
import { OrderRepository } from '../order/order.repository';
import { OrderStatus } from '../order/order.status.enum';
import { RoleEnum } from '../role/role.enum';
import { UserRepository } from '../user/user.repository';
import { TableCreateDto } from './dto/table-create.dto';
import { TableFilterDto } from './dto/table-filter.dto';
import { TableResponseDto } from './dto/table-response.dto';
import { TableUpdateDto } from './dto/table-update.dto';
import { Table } from './table.entity';
import { TableRepository } from './table.repository';

@Injectable()
export class TableService {
  constructor(
    private readonly _tableRepository: TableRepository,
    private readonly _userRepository: UserRepository,
    private readonly _orderRepository: OrderRepository,
  ) {}

  async create(createTable: TableCreateDto) {
    const storedTable = await this._tableRepository.findOne({
      name: createTable.name,
    });

    if (storedTable) throw new ConflictException('table_name_already_exists');

    const table = plainToClass(Table, createTable);

    return plainToClass(TableResponseDto, await table.save());
  }

  async findAll(filter: TableFilterDto): Promise<TableResponseDto[]> {
    console.log('Search tables for ', filter);
    const user = await this._userRepository.findOne(filter.userId);
    if (user.role.name == RoleEnum.CHEF) {
      return [];
    }
    let tables;
    if (user.role.name == RoleEnum.ADMIN) {
      tables = await this._tableRepository.find();
    } else {
      const orders = await this._orderRepository.find({
        waitressId: filter.userId,
        status: Not(Equal(OrderStatus.FINISHED)),
      });
      const wheres: any = [{ isAvailable: true, isActive: true }];
      if (orders.length > 0) {
        wheres.push({
          id: In(orders.map(o => o.tableId)),
        });
      }
      tables = await this._tableRepository.find({
        where: wheres,
      });
    }
    return tables.map(el => plainToClass(TableResponseDto, el));
  }

  async findOne(id: number): Promise<TableResponseDto> {
    const table = await this._tableRepository.findOne(id);

    if (!table) throw new NotFoundException('table_was_not_found');

    return plainToClass(TableResponseDto, table);
  }

  async update(id: number, tableUpdateDto: TableUpdateDto) {
    const table = await this._tableRepository.findOne(id);

    if (!table) throw new NotFoundException('table_was_not_found');

    //Query to get a table with the name to update to compare if the name is already taken
    const storedTable = await this._tableRepository.findOne({
      name: tableUpdateDto.name,
      id: Not(id),
    });

    if (storedTable) {
      throw new ConflictException('table_name_has_already_been_taken');
    }

    if (!tableUpdateDto.isActive) {
      const currentOrder = await this._orderRepository.findOne({
        tableId: Equal(table.id),
        status: Not(OrderStatus.FINISHED),
      });
      if (currentOrder) {
        throw new ConflictException('the_table_cant_be_disabled');
      }
    }

    table.name = tableUpdateDto.name;
    table.isActive = tableUpdateDto.isActive;

    return plainToClass(TableResponseDto, await table.save());
  }
}

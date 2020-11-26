import { ConflictException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Not } from 'typeorm';
import { TableCreateDto } from './dto/create-table.dto';
import { TableResponseDto } from './dto/response-table.dto';
import { TableUpdateDto } from './dto/update-table.dto';
import { Table } from './table.entity';
import { TableRepository } from './table.repository';

@Injectable()
export class TableService {
  constructor(private readonly _tableRepository: TableRepository) {}

  async create(createTable: TableCreateDto) {
    const storedTable = await this._tableRepository.findOne({
      name: createTable.name,
    });

    if (storedTable) throw new ConflictException('table_name_already_exists');

    const table = plainToClass(Table, createTable);

    return plainToClass(TableResponseDto, await table.save());
  }

  async findAll(): Promise<TableResponseDto[]> {
    const tables = await this._tableRepository.find();
    return tables.map(el => plainToClass(TableResponseDto, el));
  }

  async findOne(id: number): Promise<TableResponseDto> {
    const table = await this._tableRepository.findOne(id);

    if (!table) throw new ConflictException('table_was_not_found');

    return plainToClass(TableResponseDto, table);
  }

  async update(id: number, TableUpdateDto: TableUpdateDto) {
    const table = await this._tableRepository.findOne(id);

    if (!table) throw new ConflictException('table_was_not_found');

    //Query to get a table with the name to update to compare if the name is already taken
    const storedTable = await this._tableRepository.findOne({
      name: TableUpdateDto.name,
      id: Not(id),
    });

    if (storedTable) {
      throw new ConflictException('table_name_has_already_been_taken');
    }

    table.name = TableUpdateDto.name;
    table.isActive = TableUpdateDto.isActive;

    return plainToClass(TableResponseDto, await table.save());
  }
}

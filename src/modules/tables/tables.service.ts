import { ConflictException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateTableDto } from './dto/create-table.dto';
import { ResponseTableDto } from './dto/response-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './table.entity';
import { TableRepository } from './table.repository';

@Injectable()
export class TablesService {
  constructor(private readonly _tableRepository: TableRepository) {}

  async create(createTable: CreateTableDto) {
    const storedTable = await this._tableRepository.findOne({
      name: createTable.name,
    });

    if (storedTable) throw new ConflictException('table_name_already_exists');

    const table = plainToClass(Table, createTable);

    return plainToClass(ResponseTableDto, await table.save());
  }

  async findAll(): Promise<ResponseTableDto[]> {
    const tables = await this._tableRepository.find();
    return tables.map(el => plainToClass(ResponseTableDto, el));
  }

  async findOne(id: number): Promise<ResponseTableDto> {
    const table = await this._tableRepository.findOne(id);

    if (!table) throw new ConflictException('table_was_not_found');

    return plainToClass(ResponseTableDto, table);
  }

  async update(id: number, updateTableDto: UpdateTableDto) {
    const table = await this._tableRepository.findOne(id);

    if (!table) throw new ConflictException('table_was_not_found');

    //Query to get a table with the name to update to compare if the name is already taken
    const storedTable = await this._tableRepository.findOne({
      name: updateTableDto.name,
    });

    if (storedTable) {
      if (storedTable.id != table.id) {
        throw new ConflictException('table_name_has_already_been_taken');
      }
    }

    table.name = updateTableDto.name;
    table.isActive = updateTableDto.isActive;

    return plainToClass(ResponseTableDto, await table.save());
  }
}

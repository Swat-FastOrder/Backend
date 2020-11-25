import { EntityRepository, Repository } from 'typeorm';
import { Table } from './table.entity';

@EntityRepository(Table)
export class TableRepository extends Repository<Table> {}

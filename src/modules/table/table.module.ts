import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableRepository } from './table.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TableRepository])],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}

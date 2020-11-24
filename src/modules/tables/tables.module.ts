import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableRepository } from './table.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TableRepository])],
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule {}

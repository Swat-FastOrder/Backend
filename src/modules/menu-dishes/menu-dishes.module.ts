import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuDishesRepository } from './menu-dishes.repository';
import { MenuDishesService } from './menu-dishes.service';
import { MenuDishesController } from './menu-dishes.controller';
import { MenuCategoryModule } from '../menu-category/menu-category.module';

@Module({
  imports: [
    MenuCategoryModule,
    TypeOrmModule.forFeature([MenuDishesRepository]),
  ],
  providers: [MenuDishesService],
  controllers: [MenuDishesController],
})
export class MenuDishesModule {}

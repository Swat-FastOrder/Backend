import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuDishesRepository } from './menu-dishes.repository';
import { MenuDishesService } from './menu-dishes.service';
import { MenuDishesController } from './menu-dishes.controller';
import { MenuCategoryRepository } from '../menu-category/menu-category.respository';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    CloudinaryModule,
    TypeOrmModule.forFeature([MenuDishesRepository, MenuCategoryRepository]),
  ],
  providers: [MenuDishesService],
  controllers: [MenuDishesController],
})
export class MenuDishesModule {}

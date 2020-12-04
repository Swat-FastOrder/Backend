import { Module } from '@nestjs/common';
import { MenuCategoryService } from './menu-category.service';
import { MenuCategoryController } from './menu-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuCategoryRepository } from './menu-category.respository';

@Module({
  imports: [TypeOrmModule.forFeature([MenuCategoryRepository])],
  controllers: [MenuCategoryController],
  providers: [MenuCategoryService],
})
export class MenuCategoryModule {}

import { ConflictException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MenuCategoryCreateDto } from './dto/menu-category-create.dto';
import { MenuCategoryResponseDto } from './dto/menu-category-response.dto';
import { MenuCategoryUpdateDto } from './dto/menu-category-update.dto';
import { MenuCategory } from './menu-category.entity';
import { MenuCategoryRepository } from './menu-category.respository';

@Injectable()
export class MenuCategoryService {
  constructor(
    private readonly _menuCategoryRepository: MenuCategoryRepository,
  ) {}

  async findAll(): Promise<MenuCategoryResponseDto[]> {
    const menuCategories = await this._menuCategoryRepository.find();
    return menuCategories.map(el => plainToClass(MenuCategoryResponseDto, el));
  }

  async findOne(id: number): Promise<MenuCategoryResponseDto> {
    return plainToClass(
      MenuCategoryResponseDto,
      await this._menuCategoryRepository.findOne(id),
    );
  }

  async create(newMenuCategory: MenuCategoryCreateDto) {
    const menuCategory = await this._menuCategoryRepository.findOne({
      name: newMenuCategory.name,
    });

    if (menuCategory)
      throw new ConflictException('menu_category_name_already_exists');

    const theMenuCategory = plainToClass(MenuCategory, newMenuCategory);
    return plainToClass(MenuCategoryResponseDto, await theMenuCategory.save());
  }

  async update(id: number, updateMenuCategoryDto: MenuCategoryUpdateDto) {
    const menuCategory = await this._menuCategoryRepository.findOne(id);

    if (!menuCategory)
      throw new ConflictException('menu_category_was_not_found');

    menuCategory.name = updateMenuCategoryDto.name;

    return plainToClass(MenuCategoryResponseDto, await menuCategory.save());
  }
}

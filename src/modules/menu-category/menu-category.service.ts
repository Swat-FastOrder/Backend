import { ConflictException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { ResponseMenuCategoryDto } from './dto/response-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { MenuCategory } from './menu-category.entity';
import { MenuCategoryRepository } from './menu-category.respository';

@Injectable()
export class MenuCategoryService {
  constructor(
    private readonly _menuCategoryRepository: MenuCategoryRepository,
  ) {}

  async findAll(): Promise<ResponseMenuCategoryDto[]> {
    const menuCategories = await this._menuCategoryRepository.find();
    return menuCategories.map(el => plainToClass(ResponseMenuCategoryDto, el));
  }

  async findOne(id: number): Promise<ResponseMenuCategoryDto> {
    return plainToClass(
      ResponseMenuCategoryDto,
      await this._menuCategoryRepository.findOne(id),
    );
  }

  async create(newMenuCategory: CreateMenuCategoryDto) {
    const menuCategory = await this._menuCategoryRepository.findOne({
      name: newMenuCategory.name,
    });

    if (menuCategory)
      throw new ConflictException('menu_category_name_already_exists');

    const theMenuCategory = plainToClass(MenuCategory, newMenuCategory);
    theMenuCategory.authorId = 1;
    return plainToClass(ResponseMenuCategoryDto, await theMenuCategory.save());
  }

  async update(id: number, updateMenuCategoryDto: UpdateMenuCategoryDto) {
    const menuCategory = await this._menuCategoryRepository.findOne(id);

    if (!menuCategory)
      throw new ConflictException('menu_category_was_not_found');

    menuCategory.name = updateMenuCategoryDto.name;

    return plainToClass(ResponseMenuCategoryDto, await menuCategory.save());
  }
}

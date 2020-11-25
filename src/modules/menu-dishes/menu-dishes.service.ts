import { ConflictException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MenuDishesCreateDto } from './dtos/menu-dishes-create.dto';
import { MenuDish } from './menu-dishes.entity';
import { MenuDishesRepository } from './menu-dishes.repository';
import { MenuDishesResponseDto } from './dtos/menu-dishes-response.dto';
import { MenuDishUpdateDto } from './dtos/menu-dishes-update.dto';

@Injectable()
export class MenuDishesService {
  constructor(private readonly _menuDishesRepository: MenuDishesRepository) {}

  async findAll(): Promise<MenuDishesResponseDto[]> {
    const menuDishes = await this._menuDishesRepository.find();
    return menuDishes.map(m => plainToClass(MenuDishesResponseDto, m));
  }

  async findById(dishId: number): Promise<MenuDishesResponseDto> {
    return plainToClass(
      MenuDishesResponseDto,
      await this._menuDishesRepository.findOne(dishId),
    );
  }

  async create(dish: MenuDishesCreateDto) {
    const repeatedDish = await this._menuDishesRepository.findOne({
      name: dish.name,
    });
    if (repeatedDish) throw new ConflictException('dish_already_exists');

    const newDish: MenuDish = plainToClass(MenuDish, dish);
    return plainToClass(MenuDishesResponseDto, await newDish.save());
  }

  async update(dishId: number, menuDishUpdateDto: MenuDishUpdateDto) {
    const dish = await this._menuDishesRepository.findOne(dishId);

    if (!dish) throw new ConflictException('menu_dish_not_found');

    dish.name = menuDishUpdateDto.name;
    dish.description = menuDishUpdateDto.description;
    dish.categoryId = menuDishUpdateDto.categoryId;
    dish.isRecommended = menuDishUpdateDto.isRecommended;
    dish.isActive = menuDishUpdateDto.isActive;
    dish.price = menuDishUpdateDto.price;
    dish.imageUrl = menuDishUpdateDto.imageUrl;
    dish.authorId = menuDishUpdateDto.authorId;

    return plainToClass(MenuDishesResponseDto, await dish.save());
  }

  async uploadDishImage(dishId: number, imageUrl: string) {
    this._menuDishesRepository.update(dishId, { imageUrl });
    const dish = await this._menuDishesRepository.findOne(dishId);
    return plainToClass(MenuDishesResponseDto, await dish.save());
  }
}

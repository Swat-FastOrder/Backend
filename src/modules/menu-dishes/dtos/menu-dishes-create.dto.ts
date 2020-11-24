import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class MenuDishesCreateDto {
  @ApiProperty({ description: 'Menu dish name', required: true })
  @IsString({ message: 'menu-dishes_name_required' })
  name: string;

  @ApiProperty({ description: 'Menu dish description', required: true })
  @IsString({ message: 'menu-dishes_description_required' })
  description: string;

  @ApiProperty({ description: 'Menu dish category', required: true })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'menu-dishes_category_id_required' },
  )
  categoryId: number;

  @ApiProperty({ description: 'Menu dish category', required: true })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'menu-dishes_price_required' },
  )
  price: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class MenuDishUpdateDto {
  @ApiProperty({ description: 'Menu dish name', required: false })
  @IsString({ message: 'menu-dishes_name_must_be_a_string' })
  name: string;

  @ApiProperty({ description: 'Menu dish description', required: false })
  @IsString({ message: 'menu-dishes_description_must_be_a_string' })
  description: string;

  @ApiProperty({ description: 'Menu dish image url', required: false })
  @IsString({ message: 'menu-dishes_image_url_must_be_a_string' })
  imageUrl: string;

  @ApiProperty({ description: 'Menu dish category', required: false })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'menu-dishes_category_id_must_be_a_number' },
  )
  categoryId: number;

  @ApiProperty({ description: 'Menu dish author', required: false })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'menu-dishes_author_id_must_be_a_number' },
  )
  authorId: number;

  @ApiProperty({ description: 'Menu dish category', required: false })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'menu-dishes_price_must_be_a_number' },
  )
  price: number;

  @ApiProperty({ description: 'Menu dish availability', required: false })
  @IsBoolean({ message: 'menu-dishes_is_active_must_be_a_bool' })
  isActive: boolean;

  @ApiProperty({ description: 'Menu dish recommended', required: false })
  @IsBoolean({ message: 'menu-dishes_is_active_must_be_a_bool' })
  isRecommended: boolean;
}

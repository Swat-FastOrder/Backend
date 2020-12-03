import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';

export class OrderDetailCreateDto {
  @ApiProperty({ description: 'The order', required: true })
  @IsNumber({}, { message: 'order_required' })
  orderId: number;

  @ApiProperty({ description: 'The menu dish', required: true })
  @IsNumber({}, { message: 'menu_dish_required' })
  menuDishId: number;
}

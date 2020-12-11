import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { MenuDishesResponseDto } from 'src/modules/menu-dishes/dtos/menu-dishes-response.dto';
import { OrderResponseDto } from 'src/modules/order/dtos/order-response.dto';
import { OrderDetailStatus } from '../order-detail.status.enum';

@Exclude()
export class OrderDetailResponseDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  @Type(() => OrderResponseDto)
  order: OrderResponseDto;

  @Expose()
  @ApiProperty()
  @Type(() => MenuDishesResponseDto)
  dish: MenuDishesResponseDto;

  @Expose()
  @ApiProperty()
  price: number;

  @Expose()
  @ApiProperty()
  status: OrderDetailStatus;

  @Expose()
  @ApiProperty()
  cycleInKitchen: number;

  @Expose()
  @ApiProperty()
  createdAt: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { OrderDetailStatus } from '../order-detail.status.enum';

@Exclude()
export class OrderDetailResponseDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  orderId: number;

  @Expose()
  @ApiProperty()
  menuDishId: number;

  @Expose()
  @ApiProperty()
  price: number;

  @Expose()
  @ApiProperty()
  status: OrderDetailStatus;

  @Expose()
  @ApiProperty()
  createdAt: Date;
}

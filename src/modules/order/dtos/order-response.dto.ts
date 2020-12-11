import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { OrderStatus } from '../order.status.enum';

@Exclude()
export class OrderResponseDto {
  @Expose()
  @ApiProperty()
  id: number;
  @Expose()
  @ApiProperty()
  waitressId: number;
  @Expose()
  @ApiProperty()
  tableId: number;
  @Expose()
  @ApiProperty()
  totalDiners: number;
  @Expose()
  @ApiProperty()
  totalDishes: number;
  @Expose()
  @ApiProperty()
  totalPrice: number;
  @Expose()
  @ApiProperty()
  status: OrderStatus;
  @Expose()
  @ApiProperty()
  createdAt: Date;
}

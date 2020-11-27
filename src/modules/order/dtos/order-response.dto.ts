import { Exclude, Expose } from 'class-transformer';
import { OrderStatus } from '../order.status.enum';

@Exclude()
export class OrderResponseDto {
  @Expose()
  id: number;
  @Expose()
  waitressId: number;
  @Expose()
  tableId: number;
  @Expose()
  totalDiners: number;
  @Expose()
  totalDishes: number;
  @Expose()
  totalPrice: number;
  @Expose()
  status: OrderStatus;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetailStatus } from './order-detail.status.enum';

@Entity('order_details')
export class OrderDetail extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'order_id', type: 'int' })
  orderId: number;

  @Column({ name: 'menu_dish_id', type: 'int' })
  menuDishId: number;

  @Column({ name: 'chef_id', type: 'int', nullable: true })
  chefId: number;

  @Column({ name: 'price', type: 'float' })
  price: number;

  @Column({
    type: 'enum',
    nullable: false,
    default: OrderDetailStatus.WAITING,
    enum: OrderDetailStatus,
    enumName: 'enum_order_detail_statuses',
  })
  status: OrderDetailStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}

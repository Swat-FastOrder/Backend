import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuDish } from '../menu-dishes/menu-dishes.entity';
import { OrderDetailStatus } from './order-detail.status.enum';

@Entity('order_details')
export class OrderDetail extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'order_id', type: 'int' })
  orderId: number;

  @ManyToOne(() => MenuDish, { nullable: false, eager: true })
  @JoinColumn({ name: 'menu_dish_id' })
  dish: MenuDish;

  @Column({ name: 'chef_id', type: 'int', nullable: true })
  chefId: number;

  @Column({ name: 'price', type: 'float' })
  price: number;

  @Column({
    type: 'enum',
    nullable: false,
    default: OrderDetailStatus.ORDERED,
    enum: OrderDetailStatus,
    enumName: 'enum_order_detail_statuses',
  })
  status: OrderDetailStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}

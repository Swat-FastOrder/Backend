import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from './order.status.enum';

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ name: 'waitress_id', type: 'int', nullable: true })
  waitressId: number;
  @Column({ name: 'table_id', type: 'int' })
  tableId: number;
  @Column({ name: 'total_diners', type: 'int', default: 1 })
  totalDiners: number;
  @Column({ name: 'total_dishes', type: 'int', default: 0 })
  totalDishes: number;
  @Column({ name: 'total_price', type: 'float', default: 0 })
  totalPrice: number;
  @Column({
    type: 'enum',
    nullable: false,
    default: OrderStatus.PROGRESS,
    enum: OrderStatus,
    enumName: 'enum_order_statuses',
  })
  status: OrderStatus;

  // Columns for audit
  @Column({ name: 'author_id', nullable: false })
  authorId: number;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}

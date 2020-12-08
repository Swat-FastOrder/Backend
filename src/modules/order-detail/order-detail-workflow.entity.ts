import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';
import { OrderDetailStatus } from './order-detail.status.enum';

@Entity('order_detail_workflow')
export class OrderDetailWorkflow extends BaseEntity {
  @PrimaryColumn({
    type: 'enum',
    name: 'status_start',
    nullable: false,
    enum: OrderDetailStatus,
    enumName: 'enum_order_detail_statuses',
  })
  statusStart: OrderDetailStatus;
  @PrimaryColumn({
    type: 'enum',
    name: 'status_end',
    nullable: false,
    enum: OrderDetailStatus,
    enumName: 'enum_order_detail_statuses',
  })
  statusEnd: OrderDetailStatus;
}

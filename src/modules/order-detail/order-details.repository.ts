import { EntityRepository, Repository } from 'typeorm';
import { OrderDetail } from './order-detail.entity';

@EntityRepository(OrderDetail)
export class OrderDetailRepository extends Repository<OrderDetail> {}

import { EntityRepository, Repository } from 'typeorm';
import { OrderDetailWorkflow } from './order-detail-workflow.entity';
import { OrderDetail } from './order-detail.entity';

@EntityRepository(OrderDetailWorkflow)
export class OrderDetailWorkflowRepository extends Repository<
  OrderDetailWorkflow
> {}

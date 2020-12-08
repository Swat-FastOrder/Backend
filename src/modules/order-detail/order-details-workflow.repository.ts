import { EntityRepository, Repository } from 'typeorm';
import { OrderDetailWorkflow } from './order-detail-workflow.entity';

@EntityRepository(OrderDetailWorkflow)
export class OrderDetailWorkflowRepository extends Repository<
  OrderDetailWorkflow
> {}

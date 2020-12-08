import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { OrderDetailStatus } from '../order-detail.status.enum';

export class OrderDetailUpdateDto {
  @ApiProperty({ description: 'The order detail id', required: true })
  @IsNumber({}, { message: 'order_detail_required' })
  id: number;

  @ApiProperty({
    description: 'The order detail status',
    required: true,
    enum: OrderDetailStatus,
  })
  @IsString({ message: 'table_name_required' })
  status: OrderDetailStatus;
}

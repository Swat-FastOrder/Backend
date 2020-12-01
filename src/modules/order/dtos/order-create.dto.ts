import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class OrderCreateDto {
  waitressId: number;
  @ApiProperty({
    description: 'The table of the order',
    required: true,
  })
  @IsNumber({}, { message: 'order_table_required' })
  tableId: number;
  @ApiProperty({ description: 'The total diners', required: false })
  totalDiners: number;
  authorId: number;
}

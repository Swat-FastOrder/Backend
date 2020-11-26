import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class OrderCreateDto {
  @ApiProperty({
    description: 'The waitress that attend the order',
    required: true,
  })
  @IsNumber({}, { message: 'order_waitress_required' })
  waitressId: number;
  @ApiProperty({
    description: 'The table of the order',
    required: false,
  })
  tableId: number;
  @ApiProperty({ description: 'The total diners', required: false })
  totalDiners: number;
  authorId: number;
}

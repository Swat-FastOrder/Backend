import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OrderDetailAddedResponseDto {
  @ApiProperty({ description: 'The order detail id' })
  @Expose()
  orderDetailId: number;

  @ApiProperty({ description: 'The order detail id' })
  @Expose()
  menuDishId: number;

  @ApiProperty({ description: 'The menu dish name' })
  @Expose()
  name: string;

  @ApiProperty({ description: 'The menu dish price' })
  @Expose()
  price: number;

  @ApiProperty({ description: 'The menu dish image url' })
  @Expose()
  imageUrl: string;
}

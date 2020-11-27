import { ApiProperty } from '@nestjs/swagger';

export class MenuDishUpdateDto {
  @ApiProperty({ description: 'Menu dish name', required: false })
  name: string;

  @ApiProperty({ description: 'Menu dish description', required: false })
  description: string;

  @ApiProperty({ description: 'Menu dish image url', required: false })
  imageUrl: string;

  @ApiProperty({ description: 'Menu dish category', required: false })
  categoryId: number;

  @ApiProperty({ description: 'Menu dish category', required: false })
  price: number;

  @ApiProperty({ description: 'Menu dish availability', required: false })
  isActive: boolean;

  @ApiProperty({ description: 'Menu dish recommended', required: false })
  isRecommended: boolean;
}

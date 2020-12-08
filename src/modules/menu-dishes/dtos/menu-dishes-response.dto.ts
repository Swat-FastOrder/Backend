import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MenuDishesResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  categoryId: number;

  @Expose()
  isRecommended: boolean;

  @Expose()
  isActive: boolean;

  @Expose()
  price: number;

  @Expose()
  imageUrl: string;
}

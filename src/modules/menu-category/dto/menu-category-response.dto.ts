import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MenuCategoryResponseDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  authorId: number;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}

import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RoleResponseDto {
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

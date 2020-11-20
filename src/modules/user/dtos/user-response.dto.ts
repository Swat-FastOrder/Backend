import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: number;
  @Expose()
  firstname: string;
  @Expose()
  lastname: string;
  @Expose()
  email: string;
  @Expose()
  isActive: boolean;
  @Expose()
  authorId: number;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}

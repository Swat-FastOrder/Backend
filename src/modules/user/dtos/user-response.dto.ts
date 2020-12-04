import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { RoleResponseDto } from 'src/modules/role/dto/role-response.dto';

@Exclude()
export class UserResponseDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  firstname: string;

  @Expose()
  @ApiProperty()
  lastname: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  avatar: string;

  @Expose()
  @ApiProperty()
  isActive: boolean;

  @Expose()
  @Type(() => RoleResponseDto)
  readonly role: RoleResponseDto;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}

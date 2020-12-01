import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserUpdateDto {
  @ApiProperty({ description: 'The user firstname', required: true })
  @IsString({ message: 'user_firstname_required' })
  firstname: string;
  @ApiProperty({ description: 'The user lastname', required: true })
  @IsString({ message: 'user_lastname_required' })
  lastname: string;

  @ApiProperty({ description: 'The user avatar url', required: false })
  avatar: string;

  authorId: number;
}

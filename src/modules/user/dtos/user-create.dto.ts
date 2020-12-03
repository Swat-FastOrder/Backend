import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({ description: 'The user firstname', required: true })
  @IsString({ message: 'user_firstname_required' })
  firstname: string;

  @ApiProperty({ description: 'The user lastname', required: true })
  @IsString({ message: 'user_lastname_required' })
  lastname: string;

  @ApiProperty({ description: 'The user email', required: true })
  @IsEmail({}, { message: 'user_email_required' })
  email: string;

  authorId: number;

  roleId: number;
}

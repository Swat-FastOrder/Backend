import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

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

  @ApiProperty({ description: 'The user email', required: true })
  @IsNumber({}, { message: 'user_role_required' })
  roleId: number;

  authorId: number;
}

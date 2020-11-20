import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SigninDto {
  @ApiProperty({ description: 'The email', required: true })
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'The password',
    minLength: 8,
    maxLength: 20,
    required: true,
  })
  @IsNotEmpty()
  password: string;
}

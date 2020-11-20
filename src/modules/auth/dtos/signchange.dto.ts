import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SignChangeDto {
  @ApiProperty({ description: 'The email' })
  @IsNotEmpty()
  @IsString()
  email: string;
  @ApiProperty({
    description: 'The previous password',
    minLength: 8,
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  old: string;
  @ApiProperty({
    description: 'The new password',
    minLength: 8,
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  new: string;
}

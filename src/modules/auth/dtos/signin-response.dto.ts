import { ApiProperty } from '@nestjs/swagger';

export class SigninResponseDto {
  @ApiProperty({ description: 'The access token (JWT)', required: true })
  accessToken: string;
  @ApiProperty({ description: 'The user firstname', required: true })
  firstname: string;
  @ApiProperty({ description: 'The user lastname', required: true })
  lastname: string;
  @ApiProperty({ description: 'The user email', required: true })
  email: string;
}

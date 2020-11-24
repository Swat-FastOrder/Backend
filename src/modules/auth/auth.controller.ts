import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SigninResponseDto } from './dtos/signin-response.dto';
import { SignChangeDto } from './dtos/signchange.dto';
import { SigninDto } from './dtos/signin.dto';

@ApiTags('The authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Put('sign-change')
  @UseGuards(AuthGuard('jwt'))
  async signchange(@Body() signChange: SignChangeDto): Promise<boolean> {
    console.log(signChange);
    return this._authService.signChange(signChange);
  }

  @Post('signin')
  @ApiUnauthorizedResponse({
    description: 'Invalid Credentials (invalid_credentials)',
  })
  @ApiOkResponse({ type: SigninResponseDto })
  async signIn(@Body() signin: SigninDto): Promise<SigninResponseDto> {
    return this._authService.signIn(signin);
  }
}

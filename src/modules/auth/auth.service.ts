import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { plainToClass } from 'class-transformer';
import PasswordValidator = require('password-validator');
import { SigninResponseDto } from './dtos/signin-response.dto';
import { UserRepository } from '../user/user.repository';
import { SigninDto } from './dtos/signin.dto';
import { SignChangeDto } from './dtos/signchange.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _userRepository: UserRepository,
  ) {}

  async signIn(signin: SigninDto): Promise<SigninResponseDto> {
    const user = await this._userRepository.findOne({ email: signin.email });
    if (!user) throw new NotFoundException('invalid_credentials');
    const isMatch = await compare(signin.password, user.password);
    if (!isMatch) throw new UnauthorizedException('invalid_credentials');
    const payload: IJwtPayload = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      id: user.id,
      role: user.role.name,
    };
    const token = await this._jwtService.sign(payload);
    return plainToClass(SigninResponseDto, {
      accessToken: token,
      ...payload,
    });
  }

  async signChange(signChange: SignChangeDto): Promise<boolean> {
    const user = await this._userRepository.findOne({
      email: signChange.email,
    });
    if (!user) throw new NotFoundException('user_not_found');
    const isMatch = await compare(signChange.old, user.password);
    if (!isMatch) throw new UnauthorizedException('invalid_credentials');
    const isSecure = this.isValidPassword(signChange.new);
    if (!isSecure) {
      throw new ConflictException('password_not_secured');
    }
    const salt = await genSalt(10);
    user.password = await hash(signChange.new, salt);
    await user.save();
    return true;
  }

  private isValidPassword(password: string) {
    const schema = new PasswordValidator();
    schema
      .is()
      .min(8) // Minimum length 10
      .is()
      .max(20) // Maximum length 20
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase() // Must have lowercase letters
      .has()
      .digits() // Must have digits
      .has()
      .not()
      .spaces();
    const isSecure = schema.validate(password);
    if (!isSecure) {
      console.log(
        'The password has not ',
        schema.validate(password, { list: true }),
      );
    }
    return isSecure;
  }
}

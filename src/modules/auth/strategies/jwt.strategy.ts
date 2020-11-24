import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigEnum } from 'src/modules/config/config.enum';
import { UserRepository } from 'src/modules/user/user.repository';
import { ConfigService } from 'src/modules/config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get(ConfigEnum.JWT_SECRET),
    });
  }
  async validate(payload: IJwtPayload) {
    const { email } = payload;
    const user = await this._userRepository.findOne({ email });
    if (!user) throw new UnauthorizedException();
    return payload;
  }
}

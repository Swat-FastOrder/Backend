import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserCreateDto } from './dtos/user-create.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { generate } from 'generate-password';
import { genSalt, hash } from 'bcryptjs';
import { UserResponseDto } from './dtos/user-response.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { ConfigService } from '../config/config.service';
import { ConfigEnum } from '../config/config.enum';
import { emailTemplate } from '../utils/email-welcome-template';
import { RoleRepository } from '../role/role.repository';
import { UserFilterDto } from './dtos/user-filter.dto';
import { queryBuildEqual } from '../utils/query.build.util';
import { In, Not } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _roleRepository: RoleRepository,
    private readonly _sendGrid: SendGridService,
    private readonly _configService: ConfigService,
  ) {}

  async findAll(filter: UserFilterDto): Promise<UserResponseDto[]> {
    const activeEq = queryBuildEqual(
      'isActive',
      filter.active ? filter.active : true,
    );
    const roles = await this._roleRepository.find({
      where: {
        isAdministrator: true,
      },
    });
    /**
     * I can't resolve in one query :'(
     *
     * The correct way is role: {
     *    isAdministrator: false
     * }
     * but it isn't worked, the "where" sentence generated is incorrect
     *
     */

    const users = await this._userRepository.find({
      where: {
        ...activeEq,
        role: {
          id: Not(In(roles.map(r => r.id))),
        },
      },
      order: { id: 'ASC' },
    });
    return users.map(u => plainToClass(UserResponseDto, u));
  }

  async findById(userId: number): Promise<UserResponseDto> {
    return plainToClass(
      UserResponseDto,
      await this._userRepository.findOne(userId),
    );
  }

  async create(newUser: UserCreateDto) {
    const user = await this._userRepository.findOne({ email: newUser.email });
    if (user) throw new ConflictException('email_already_exists');
    const theUser: User = plainToClass(User, newUser);
    theUser.isActive = true;
    const role = await this._roleRepository.findOne(newUser.roleId);
    if (!role) throw new NotFoundException('role_not_found');
    const password = generate({
      length: 10,
      numbers: true,
    });

    const salt = await genSalt(10);
    theUser.password = await hash(password, salt);
    theUser.role = role;
    await theUser.save();

    const emailInfo = {
      name: `${theUser.firstname} ${theUser.lastname}`,
      password,
      email: theUser.email,
      url: this._configService.get(ConfigEnum.URL_LOGIN),
    };

    await this._sendGrid.send({
      to: theUser.email,
      from: this._configService.get(ConfigEnum.BUSINESS_MAIL),
      subject: 'Welcome to Fast Order',
      html: emailTemplate(emailInfo),
    });

    return plainToClass(UserResponseDto, theUser);
  }

  async disable(userId: number) {
    const user = await this._userRepository.findOne({ id: userId });
    if (!user) throw new NotFoundException('user_not_found');
    user.isActive = false;
    return plainToClass(UserResponseDto, await user.save());
  }
  async update(userId: number, newUser: UserUpdateDto) {
    const user = await this._userRepository.findOne({ id: userId });
    if (!user) throw new NotFoundException('user_not_found');
    user.firstname = newUser.firstname;
    user.lastname = newUser.lastname;
    return plainToClass(UserResponseDto, await user.save());
  }

  async uploadAvatar(userId: number, avatarUrl: string) {
    const user = await this._userRepository.findOne({ id: userId });
    if (!user) throw new NotFoundException('user_not_found');
    console.log('Updating the avatar url', avatarUrl);
    user.avatar = avatarUrl;
    return plainToClass(UserResponseDto, await user.save());
  }
}

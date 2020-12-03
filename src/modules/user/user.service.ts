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
@Injectable()
export class UserService {

  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _sendGrid: SendGridService
  ) {}

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this._userRepository.find();
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
    const password = generate({
      length: 10,
      numbers: true,
    });

    const salt = await genSalt(10);
    theUser.password = await hash(password, salt);

    await theUser.save()

    const fullName = `${theUser.firstname} ${theUser.lastname}`;

    await this._sendGrid.send({
      to: theUser.email,
      from: new ConfigService().get(ConfigEnum.BUSINESS_MAIL),
      subject: "Welcome to Fast Order",
      html: emailTemplate(fullName, theUser.email, password),
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
    if (user.id != userId) throw new ConflictException('user_not_match');
    user.firstname = newUser.firstname;
    user.lastname = newUser.lastname;
    return plainToClass(UserResponseDto, await user.save());
  }

  async uploadAvatar(userId: number, avatarUrl: string) {
    const user = await this._userRepository.findOne({ id: userId });
    if (!user) throw new NotFoundException('user_not_found');
    user.avatar = avatarUrl;
    return plainToClass(UserResponseDto, await user.save());
  }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserCreateDto } from './dtos/user-create.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { generate } from 'generate-password';
import { genSalt, hash } from 'bcryptjs';
import { UserResponseDto } from './dtos/user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

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
    console.log(
      '-------- The generated password is -------- ',
      theUser.email,
      password,
    );
    const salt = await genSalt(10);
    theUser.password = await hash(password, salt);
    return plainToClass(UserResponseDto, await theUser.save());
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserService } from './user.service';

@ApiTags('The users')
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Retrieves the users' })
  getAll() {
    return this._userService.findAll();
  }

  @Get(':userId')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Retrieve one user' })
  getById(@Param('userId') userId: number) {
    return this._userService.findById(userId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Add user' })
  create(@Body() newUser: UserCreateDto, @Req() req) {
    newUser.authorId = req.user.id;
    return this._userService.create(newUser);
  }
}

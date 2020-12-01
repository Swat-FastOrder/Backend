import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UserService } from './user.service';

@ApiTags('The users')
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Retrieves the users' })
  @ApiOkResponse({ type: UserResponseDto, isArray: true })
  getAll() {
    return this._userService.findAll();
  }

  @Get(':userId')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Retrieve one user' })
  @ApiOkResponse({ type: UserResponseDto })
  getById(@Param('userId') userId: number) {
    return this._userService.findById(userId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Add user' })
  @ApiOkResponse({ type: UserResponseDto })
  create(@Body() newUser: UserCreateDto, @Req() req) {
    newUser.authorId = req.user.id;
    return this._userService.create(newUser);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiConflictResponse({
    description: 'It happens when user not match (user_not_match)',
  })
  @ApiNotFoundResponse({
    description: 'It happens when user not found (user_not_found)',
  })
  update(@Param('id') userId: number, @Body() newUser: UserUpdateDto) {
    return this._userService.update(userId, newUser);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Disable user' })
  @ApiNotFoundResponse({
    description: 'It happens when user not found (user_not_found)',
  })
  disable(@Param('id') userId: number) {
    return this._userService.disable(userId);
  }
}

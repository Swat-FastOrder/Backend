import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MenuDishesCreateDto } from './dtos/menu-dishes-create.dto';
import { MenuDishesService } from './menu-dishes.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Menu dishes')
@Controller('menu-dishes')
export class MenuDishesController {
  serverUrl = 'http://localhost:3000/';
  constructor(private readonly _menuDishesService: MenuDishesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all menu dishes entries' })
  getAll() {
    return this._menuDishesService.findAll();
  }

  @Get(':dishId')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Retrieve a dish' })
  getById(@Param('dishId') dishId: number) {
    return this._menuDishesService.findById(dishId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create a new menu dish' })
  create(@Body() newDish: MenuDishesCreateDto) {
    return this._menuDishesService.create(newDish);
  }

  @Get('dishes-images/:fileId')
  async serveDishImage(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'avatars' });
  }

  @Post(':dishId/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './dishes-images',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadImage(@Param('dishId') dishId, @UploadedFile() file) {
    this._menuDishesService.uploadDishImage(
      Number(dishId),
      `${this.serverUrl}${file.path}`,
    );
  }
}

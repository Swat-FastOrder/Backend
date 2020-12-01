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
  Put,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MenuDishesCreateDto } from './dtos/menu-dishes-create.dto';
import { MenuDishUpdateDto } from './dtos/menu-dishes-update.dto';
import { MenuDishesService } from './menu-dishes.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Menu dishes')
@Controller('menu-dishes')
export class MenuDishesController {
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
  create(@Body() newDish: MenuDishesCreateDto, @Req() req) {
    newDish.authorId = req.user.id;
    return this._menuDishesService.create(newDish);
  }

  @Put(':dishId')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update a menu dish by id' })
  update(
    @Param('dishId') dishId: number,
    @Body() menuDishUpdateDto: MenuDishUpdateDto,
  ) {
    return this._menuDishesService.update(dishId, menuDishUpdateDto);
  }

  @Get('dishes-images/:fileId')
  async serveDishImage(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'dishes-images' });
  }

  @Post(':dishId/image')
  @UseInterceptors(
    FileInterceptor('image', {
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
    return this._menuDishesService.uploadDishImage(
      Number(dishId),
      `/${file.path}`,
    );
  }
}

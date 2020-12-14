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
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@ApiTags('Menu dishes')
@Controller('menu-dishes')
export class MenuDishesController {
  constructor(
    private readonly _menuDishesService: MenuDishesService,
    private readonly _cloudinaryService: CloudinaryService,
  ) {}

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
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@Param('dishId') dishId, @UploadedFile() image) {
    const resultUpload: any = await this._cloudinaryService.upload(image);
    return this._menuDishesService.uploadDishImage(
      Number(dishId),
      `${resultUpload.url}`,
    );
  }
}

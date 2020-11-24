import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MenuCategoryService } from './menu-category.service';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('The menus categories')
@Controller('menu-categories')
export class MenuCategoryController {
  constructor(private readonly _menuCategoryService: MenuCategoryService) {}

  @ApiOperation({ summary: 'Retrieves menus categories' })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this._menuCategoryService.findAll();
  }

  @ApiOperation({ summary: 'Create menu category' })
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createMenuCategoryDto: CreateMenuCategoryDto) {
    return this._menuCategoryService.create(createMenuCategoryDto);
  }

  @ApiOperation({ summary: 'Retrieves one menu category' })
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: number) {
    return this._menuCategoryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update menu category' })
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: number,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto,
  ) {
    return this._menuCategoryService.update(id, updateMenuCategoryDto);
  }
}

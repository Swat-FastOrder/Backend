import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('The tables')
@Controller('tables')
export class TableController {
  constructor(private readonly _TableService: TableService) {}

  @ApiOperation({ summary: 'Retrieves all tables' })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this._TableService.findAll();
  }

  @ApiOperation({ summary: 'Create table' })
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createTableDto: CreateTableDto) {
    return this._TableService.create(createTableDto);
  }

  @ApiOperation({ summary: 'Retrieves one table' })
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this._TableService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update table' })
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this._TableService.update(+id, updateTableDto);
  }
}

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
import { TableCreateDto } from './dto/table-create.dto';
import { TableUpdateDto } from './dto/table-update.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('The tables')
@Controller('tables')
export class TableController {
  constructor(private readonly _tableService: TableService) {}

  @ApiOperation({ summary: 'Retrieves all tables' })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this._tableService.findAll();
  }

  @ApiOperation({ summary: 'Create table' })
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() tableCreateDto: TableCreateDto) {
    return this._tableService.create(tableCreateDto);
  }

  @ApiOperation({ summary: 'Retrieves one table' })
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this._tableService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update table' })
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() tableUpdateDto: TableUpdateDto) {
    return this._tableService.update(+id, tableUpdateDto);
  }
}

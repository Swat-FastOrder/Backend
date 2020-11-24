import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('The tables')
@Controller('tables')
export class TablesController {
  constructor(private readonly _tablesService: TablesService) {}

  @ApiOperation({ summary: 'Retrieves all tables' })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this._tablesService.findAll();
  }

  @ApiOperation({ summary: 'Create table' })
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createTableDto: CreateTableDto) {
    return this._tablesService.create(createTableDto);
  }

  @ApiOperation({ summary: 'Retrieves one table' })
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this._tablesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update table' })
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this._tablesService.update(+id, updateTableDto);
  }
}

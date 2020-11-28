import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { OrderCreateDto } from './dtos/order-create.dto';
import { OrderResponseDto } from './dtos/order-response.dto';
import { OrderService } from './order.service';

@ApiTags('The orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly _orderService: OrderService) {}

  @ApiOperation({ summary: 'Retrieves the orders' })
  @ApiOkResponse({ type: OrderResponseDto, isArray: true })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    // TODO We must evaluate the role
    return this._orderService.findAll({});
  }

  @ApiOperation({ summary: 'Retrieves one order' })
  @ApiOkResponse({ type: OrderResponseDto })
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findById(@Param('id') id: number) {
    return this._orderService.findById(id);
  }

  @ApiOperation({ summary: 'Create order' })
  @ApiConflictResponse({
    description:
      'It happens when the table isnt available (order_table_not_ready_or_not_found)',
  })
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() newOrder: OrderCreateDto, @Req() req) {
    newOrder.authorId = req.user.id;
    return this._orderService.create(newOrder);
  }

  @ApiOperation({ summary: 'Delete one order' })
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: number) {
    return this._orderService.delete(id);
  }
}

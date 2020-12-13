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
  ApiParam,
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
    newOrder.waitressId = req.user.id;
    return this._orderService.create(newOrder);
  }

  @ApiOperation({ summary: 'Delete one order' })
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: number) {
    return this._orderService.delete(id);
  }

  @ApiOperation({ summary: 'Send order to kitchen' })
  @ApiParam({ name: 'id', description: 'Order Id' })
  @ApiOkResponse({ type: OrderResponseDto })
  @ApiConflictResponse({
    description: 'order is not in ordering status | order is empty',
  })
  @ApiNotFoundResponse({ description: 'it happens when order is not found' })
  @Put('send-to-kitchen/:id')
  @UseGuards(AuthGuard('jwt'))
  sendToKitchen(@Param('id') id: number) {
    return this._orderService.sendToKitchen(id);
  }

  @ApiOperation({ summary: 'Finish order' })
  @ApiParam({ name: 'id', description: 'Order Id' })
  @ApiOkResponse({ type: OrderResponseDto })
  @ApiConflictResponse({
    description: 'order is not in correct status',
  })
  @ApiNotFoundResponse({ description: 'it happens when order is not found' })
  @Put('finish/:id')
  @UseGuards(AuthGuard('jwt'))
  finish(@Param('id') id: number) {
    return this._orderService.finish(id);
  }
}

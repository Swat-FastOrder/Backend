import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailCreateDto } from './dto/order-detail-create.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OrderDetailResponseDto } from './dto/order-detail-response.dto';
import { OrderDetailAddedResponseDto } from './dto/order-detail-added-response.dto';

@ApiTags('Order Details')
@Controller('order-details')
export class OrderDetailController {
  constructor(private readonly _orderDetailService: OrderDetailService) {}

  @ApiOperation({
    summary: 'Retrieves the orders details',
  })
  @ApiOkResponse({ type: OrderDetailResponseDto, isArray: true })
  @ApiQuery({ name: 'orderId', required: false, type: Number })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Query() queryParams) {
    const { orderId } = queryParams;
    return this._orderDetailService.findAll({ orderId });
  }

  @ApiOperation({ summary: 'Add one menu dish to an given order' })
  @ApiOkResponse({ type: OrderDetailAddedResponseDto })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() orderDetailCreateDto: OrderDetailCreateDto) {
    return this._orderDetailService.create(orderDetailCreateDto);
  }

  @ApiOperation({ summary: 'Remove a order detail from order' })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this._orderDetailService.remove(+id);
  }
}

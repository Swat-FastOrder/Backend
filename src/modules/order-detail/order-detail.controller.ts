import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Get,
} from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailCreateDto } from './dto/order-detail-create.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OrderDetailResponseDto } from './dto/order-details-response.dto';

@ApiTags('Order Details')
@Controller('order-details')
export class OrderDetailController {
  constructor(private readonly _orderDetailService: OrderDetailService) {}

  @ApiOperation({
    summary:
      'Retrieves the details for a single order (only for testing detail creation)',
  })
  @ApiOkResponse({ type: OrderDetailResponseDto, isArray: true })
  @Get('order/:orderId')
  @UseGuards(AuthGuard('jwt'))
  findAllByOrderId(@Param('orderId') orderId: number) {
    return this._orderDetailService.findAllByOrderId(orderId);
  }

  @ApiOperation({ summary: 'Add one menu dish to an given order' })
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

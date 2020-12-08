import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Get,
  Query,
  Put,
} from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailCreateDto } from './dto/order-detail-create.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OrderDetailResponseDto } from './dto/order-detail-response.dto';
import { OrderDetailAddedResponseDto } from './dto/order-detail-added-response.dto';
import { OrderDetailUpdateDto } from './dto/order-detail-update.dto';

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
  @ApiNotFoundResponse({
    description:
      'It happens when a order to add dish was not found or menu dish was not found',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() orderDetailCreateDto: OrderDetailCreateDto) {
    return this._orderDetailService.create(orderDetailCreateDto);
  }

  @ApiOperation({ summary: 'Remove a order detail from order' })
  @ApiNotFoundResponse({
    description: 'It happens when a order detail was not found to delete',
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this._orderDetailService.remove(+id);
  }

  @ApiOperation({ summary: 'Update order detail' })
  @ApiOkResponse({ type: OrderDetailResponseDto })
  @UseGuards(AuthGuard('jwt'))
  @Put()
  update(@Body() orderDetailUpdateDto: OrderDetailUpdateDto) {
    return this._orderDetailService.update(orderDetailUpdateDto);
  }
}

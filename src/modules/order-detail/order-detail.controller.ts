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
  Req,
} from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailCreateDto } from './dto/order-detail-create.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
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
  findAll(@Query() queryParams, @Req() req) {
    const { orderId, status } = queryParams;
    return this._orderDetailService.findAll({
      orderId,
      status,
      role: req.user.role,
    });
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

  @ApiOperation({ summary: 'The dish is preparing' })
  @ApiParam({ name: 'id', description: 'Order detail Id' })
  @ApiOkResponse({ type: OrderDetailResponseDto })
  @ApiNotFoundResponse({
    description:
      'it happens when the dish is not found (order_detail_not_found) or cant prepare the dish (order_detail_workflow_not_found)',
  })
  @Put('preparing/:id')
  @UseGuards(AuthGuard('jwt'))
  preparing(@Param('id') id: number) {
    return this._orderDetailService.preparing(id);
  }
  @ApiOperation({ summary: 'The dish is already to serve' })
  @ApiParam({ name: 'id', description: 'Order detail Id' })
  @ApiOkResponse({ type: OrderDetailResponseDto })
  @ApiNotFoundResponse({
    description:
      'it happens when the dish is not found (order_detail_not_found) or cant check the dish like ready to serve (order_detail_workflow_not_found)',
  })
  @Put('ready-to-serve/:id')
  @UseGuards(AuthGuard('jwt'))
  readyToServe(@Param('id') id: number) {
    return this._orderDetailService.readyToServe(id);
  }

  @ApiOperation({ summary: 'The dish was served' })
  @ApiParam({ name: 'id', description: 'Order detail Id' })
  @ApiOkResponse({ type: OrderDetailResponseDto })
  @ApiNotFoundResponse({
    description:
      'it happens when the dish is not found (order_detail_not_found) or cant serve the dish (order_detail_workflow_not_found)',
  })
  @Put('served/:id')
  @UseGuards(AuthGuard('jwt'))
  serve(@Param('id') id: number) {
    return this._orderDetailService.serve(id);
  }
}

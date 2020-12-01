import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TableCreateDto {
  @ApiProperty({ description: 'The table name', required: true })
  @IsString({ message: 'table_name_required' })
  name: string;
}

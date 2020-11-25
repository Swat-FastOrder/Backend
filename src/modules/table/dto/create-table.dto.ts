import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTableDto {
  @ApiProperty({ description: 'The table name', required: true })
  @IsString({ message: 'table_name_required' })
  name: string;
}

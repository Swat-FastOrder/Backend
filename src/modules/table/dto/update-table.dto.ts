import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsString } from 'class-validator';

export class TableUpdateDto {
  @ApiProperty({ description: 'The table name', required: true })
  @IsString({ message: 'table_name_required' })
  name: string;
  @ApiProperty({
    description: 'The table active/inactive status',
    required: true,
  })
  @IsDefined({ message: 'table_is_active_attribute_required' })
  @IsBoolean({ message: 'table_is_active_attribute_must_be_true_or_false' })
  isActive: boolean;
}

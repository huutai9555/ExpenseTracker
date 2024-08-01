import { Type } from 'class-transformer';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class CreateExpenseDto {
  @IsNumber()
  amount: number;

  @IsString()
  category: string;

  @IsString()
  description: string;

  @Type(() => Date)
  @IsDate()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date | null = null;
}

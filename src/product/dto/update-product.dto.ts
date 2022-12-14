import { IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  name: string;
  @IsString()
  desc: string;
}

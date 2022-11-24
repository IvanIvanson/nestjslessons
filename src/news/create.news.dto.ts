/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateNewsDto {
  @IsString()
  title: string;
  @IsString({
    message: 'поле description должно быть строкой',
  })
  description: string;

  @ApiProperty({
    description: 'Description news',
    minimum: 1,
    maximum: 2,
  })
  // @ApiProperty()
  @IsString()
  author: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  // eslint-disable-next-line prettier/prettier
  countView?: string;
}

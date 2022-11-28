import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class EditCommentDto{
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.dmessage)
  message: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.author)
  athor: string;
}
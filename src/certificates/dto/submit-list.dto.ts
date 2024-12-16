// src/certificates/dto/submit-list.dto.ts
import { IsArray, IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PersonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}

export class SubmitListDto {
  @IsString()
  @IsNotEmpty()
  issuedBy: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PersonDto)
  people: PersonDto[];
}

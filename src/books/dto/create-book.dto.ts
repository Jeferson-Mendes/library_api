import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsEmpty({ message: 'You cannot provide ID' })
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  readonly author: string;
}

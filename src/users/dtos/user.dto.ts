import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: 'the password of user' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the rut of user' })
  readonly rut: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'the role of user' })
  readonly role: string;

  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: 'the id of customer' })
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

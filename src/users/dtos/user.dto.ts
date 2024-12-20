import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsPositive,
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
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'the role of user' })
  readonly role: string;

  @IsPositive()
  @ApiProperty({ description: 'the id of customer' })
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

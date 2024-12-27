import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
  Validate,

} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CustomMaxPriceValidator } from 'src/common/price.validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's description` })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `product's price` })
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `product's stock` })
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: `product's image` })
  readonly image: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: `product's brand id` })
  brandId: number;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ description: `product's categories` })
  categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @Min(0)
  readonly offset: number;

  @IsOptional()
  @IsPositive()
  readonly minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @Validate(CustomMaxPriceValidator)
  readonly maxPrice: number;
}

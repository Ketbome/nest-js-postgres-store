import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customMaxPrice', async: false })
export class CustomMaxPriceValidator implements ValidatorConstraintInterface {
  validate(maxPrice: number, args: ValidationArguments) {
    const { minPrice } = args.object as any;
    return maxPrice > minPrice;
  }

  defaultMessage(args: ValidationArguments) {
    return 'maxPrice must be greater than minPrice';
  }
}

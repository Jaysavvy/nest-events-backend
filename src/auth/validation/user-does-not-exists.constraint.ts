import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class UserDoesNotExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const entity = await this.userRepository.findOneBy({
      [validationArguments.property]: value,
    });

    return entity == null;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} already exists`;
  }
}

export function UserDoesNotExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'userDoesNotExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserDoesNotExistConstraint,
    });
  };
}

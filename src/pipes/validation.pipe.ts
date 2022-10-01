/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import {
    ArgumentMetadata,
    Injectable,
    PipeTransform,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const data = plainToClass(metatype, value);
        const errors = await validate(data);

        if (errors.length) {
            const message = errors.map(
                (error) => `${error.property}: ${Object.values(error.constraints)}`
            );

            throw new HttpException(message, HttpStatus.BAD_REQUEST);
        }

        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}

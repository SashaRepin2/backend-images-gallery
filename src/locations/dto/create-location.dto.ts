import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateLocationDto {
    @ApiProperty({
        description: "Местоположение",
        example: "Франция, Париж",
    })
    @IsString({
        message: "Должно быть строкой",
    })
    @MinLength(1, {
        message: "Мин. длина равна 1 символу",
    })
    readonly location: string;
}

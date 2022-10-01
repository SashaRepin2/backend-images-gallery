import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateAuthorDto {
    @ApiProperty({
        example: "Виктор Васнецов",
        description: "Имя автора",
    })
    @IsString({
        message: "Должно быть строкой",
    })
    @MinLength(1, {
        message: "Мин. длина равна 1 символу",
    })
    readonly name: string;
}

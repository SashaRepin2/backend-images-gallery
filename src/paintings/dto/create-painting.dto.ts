import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsUrl, Min, MinLength } from "class-validator";

export class CreatePaintingDto {
    @ApiProperty({
        description: "Название картины",
        example: "Девятый вал",
    })
    @IsString({
        message: "Имя должно быть сторокой",
    })
    @MinLength(1, {
        message: "Мин. длина равна 1 символу",
    })
    readonly name;

    @ApiProperty({
        description: "Год создания",
        example: "1867",
    })
    @IsInt({
        message: "Год создания должен быть целым числом",
    })
    readonly created: number;

    @ApiProperty({
        description: "Url изображения",
        example:
            "https://cs1.livemaster.ru/storage/f1/4f/9685840e22d80de694c01c1ae5m3--kartiny-i-panno-devyatyj-val-kopiya.jpg",
    })
    @IsUrl(
        {},
        {
            message: "Строка должна быть URL",
        }
    )
    readonly imageUrl;

    @ApiProperty({
        description: "Id автора",
        example: "2",
    })
    @IsInt({
        message: "ID автора должно быть числом",
    })
    @Min(0, {
        message: "Должно быть >=0",
    })
    readonly authorId;

    @ApiProperty({
        description: "Id местоположения",
        example: "1",
    })
    @IsInt({ message: "ID местоположения должно быть числом" })
    @Min(0, {
        message: "Должно быть >=0",
    })
    readonly locationId;
}

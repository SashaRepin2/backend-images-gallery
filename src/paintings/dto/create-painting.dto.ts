import { ApiProperty } from "@nestjs/swagger";

export class CreatePaintingDto {
    @ApiProperty({
        description: "Название картины",
        example: "Девятый вал",
    })
    readonly name;

    @ApiProperty({
        description: "Url изображения",
        example:
            "https://cs1.livemaster.ru/storage/f1/4f/9685840e22d80de694c01c1ae5m3--kartiny-i-panno-devyatyj-val-kopiya.jpg",
    })
    readonly imageUrl;

    @ApiProperty({
        description: "Id автора",
        example: "2",
    })
    readonly authorId;

    @ApiProperty({
        description: "Id местоположения",
        example: "1",
    })
    readonly locationId;
}

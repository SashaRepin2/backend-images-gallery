import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto {
    @ApiProperty({
        description: "Местоположение",
        example: "Франция, Париж",
    })
    readonly location: string;
}

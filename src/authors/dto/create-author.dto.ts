import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthorDto {
    @ApiProperty({
        example: "Виктор Васнецов",
        description: "Имя автора",
    })
    readonly name: string;
}

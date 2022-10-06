import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { PaintingsModel } from "src/paintings/models/paintings.model";
import { CreateAuthorDto } from "../dto/create-author.dto";

@Table({
    tableName: "authors",
    createdAt: false,
    updatedAt: false,
})
export class AuthorsModel extends Model<AuthorsModel, CreateAuthorDto> {
    @ApiProperty({
        example: "1",
        description: "Уникальный идентификатор",
    })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    })
    id: number;

    @ApiProperty({
        example: "Виктор Васнецов",
        description: "Имя автора",
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @HasMany(() => PaintingsModel)
    paintings: PaintingsModel[];
}

import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { CreateAuthorDto } from "src/authors/dto/create-author.dto";
import { PaintingsModel } from "src/paintings/models/paintings.model";

@Table({
    tableName: "locations",
    createdAt: false,
    updatedAt: false,
})
export class LocationsModel extends Model<LocationsModel, CreateAuthorDto> {
    @ApiProperty({
        example: "1",
        description: "Уникальный идентификатор",
    })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    })
    id: number;

    @ApiProperty({
        example: "Paris",
        description: "Местоположение",
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    location: string;

    @HasMany(() => PaintingsModel)
    paintings: PaintingsModel[];
}

import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { AuthorsModel } from "src/authors/models/authors.model";
import { LocationsModel } from "src/locations/models/locations.model";
import { CreatePaintingDto } from "../dto/create-painting.dto";

@Table({
    tableName: "paintings",
    createdAt: false,
    updatedAt: false,
})
export class PaintingsModel extends Model<PaintingsModel, CreatePaintingDto> {
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
        description: "Название картины",
        example: "Девятый вал",
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @ApiProperty({
        description: "Год создания",
        example: "1920",
    })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    created: number;

    @ApiProperty({
        description: "Url изображения",
        example:
            "https://cs1.livemaster.ru/storage/f1/4f/9685840e22d80de694c01c1ae5m3--kartiny-i-panno-devyatyj-val-kopiya.jpg",
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    imageUrl: string;

    @ApiProperty({
        description: "ID автора",
        example: "1",
    })
    @ForeignKey(() => AuthorsModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    authorId: number;

    @ApiProperty({
        description: "ID местоположения",
        example: "12",
    })
    @ForeignKey(() => LocationsModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    locationId: number;

    @BelongsTo(() => AuthorsModel)
    author: AuthorsModel;

    @BelongsTo(() => LocationsModel)
    location: LocationsModel;
}

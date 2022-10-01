import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PaintingsModel } from "./models/paintings.model";
import { PaintingsController } from "./paintings.controller";
import { PaintingsService } from "./paintings.service";

@Module({
    imports: [SequelizeModule.forFeature([PaintingsModel])],
    controllers: [PaintingsController],
    providers: [PaintingsService],
})
export class PaintingsModule {}

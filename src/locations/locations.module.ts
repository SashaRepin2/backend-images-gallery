import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { LocationsController } from "./locations.controller";
import { LocationsService } from "./locations.service";
import { LocationsModel } from "./models/locations.model";

@Module({
    imports: [SequelizeModule.forFeature([LocationsModel])],
    controllers: [LocationsController],
    providers: [LocationsService],
})
export class LocationsModule {}

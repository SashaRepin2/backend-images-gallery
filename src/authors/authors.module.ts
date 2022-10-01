import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthorsController } from "./authors.controller";
import { AuthorsService } from "./authors.service";
import { AuthorsModel } from "./models/authors.model";

@Module({
    imports: [SequelizeModule.forFeature([AuthorsModel])],
    controllers: [AuthorsController],
    providers: [AuthorsService],
})
export class AuthorsModule {}

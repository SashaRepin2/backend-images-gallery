import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

import { AuthorsModule } from "./authors/authors.module";
import { AuthorsModel } from "./authors/models/authors.model";
import { LocationsModule } from "./locations/locations.module";
import { LocationsModel } from "./locations/models/locations.model";
import { PaintingsModel } from "./paintings/models/paintings.model";
import { PaintingsModule } from "./paintings/paintings.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV || "development"}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: "postgres",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            models: [AuthorsModel, PaintingsModel, LocationsModel],
            autoLoadModels: true,
            synchronize: true,
        }),
        AuthorsModule,
        LocationsModule,
        PaintingsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

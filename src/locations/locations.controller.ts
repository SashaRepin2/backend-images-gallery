import { Controller, Get, Post, Delete, Param, Body, UsePipes, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { CreateLocationDto } from "./dto/create-location.dto";
import { LocationsService } from "./locations.service";
import { LocationsModel } from "./models/locations.model";

@ApiTags("locations")
@UsePipes(ValidationPipe)
@Controller("locations")
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) {}

    @ApiOperation({ summary: "Создание местоположения" })
    @ApiResponse({
        type: LocationsModel,
        status: HttpStatus.OK,
    })
    @Post()
    create(@Body() locationDto: CreateLocationDto) {
        return this.locationsService.create(locationDto);
    }

    @ApiOperation({ summary: "Получение всех местоположений" })
    @ApiResponse({
        type: [LocationsModel],
        status: HttpStatus.OK,
    })
    @Get()
    findAll() {
        return this.locationsService.findAll();
    }

    @ApiOperation({ summary: "Получение местоположения" })
    @ApiResponse({
        type: LocationsModel,
        status: HttpStatus.OK,
    })
    @Get(":id")
    findOne(@Param() id: string) {
        return this.locationsService.findOne(Number(id));
    }

    @ApiOperation({ summary: "Удаление местоположения" })
    @ApiResponse({
        type: LocationsModel,
        status: HttpStatus.OK,
    })
    @Delete(":id")
    delete(@Param() id: string) {
        return this.locationsService.delete(Number(id));
    }
}

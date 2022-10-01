import { Controller, Get, Post, Delete, Param, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateLocationDto } from "./dto/create-location.dto";
import { LocationsService } from "./locations.service";

@ApiTags("locations")
@Controller("locations")
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) {}
    @Post()
    create(@Body() locationDto: CreateLocationDto) {
        return this.locationsService.create(locationDto);
    }

    @Get()
    findAll() {
        return this.locationsService.findAll();
    }

    @Get(":id")
    findOne(@Param() id: string) {
        return this.locationsService.findOne(Number(id));
    }

    @Delete(":id")
    delete(@Param() id: string) {
        return this.locationsService.delete(Number(id));
    }
}

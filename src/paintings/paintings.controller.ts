import { Controller, Get, Post, Delete, Body, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreatePaintingDto } from "./dto/create-painting.dto";
import { PaintingsService } from "./paintings.service";

@ApiTags("paintings")
@Controller("paintings")
export class PaintingsController {
    constructor(private readonly paintingsService: PaintingsService) {}

    @Post()
    create(@Body() paintingDto: CreatePaintingDto) {
        return this.paintingsService.create(paintingDto);
    }

    @Get()
    findAll() {
        return this.paintingsService.findAll();
    }

    @Get(":id")
    findOne(@Param() id: string) {
        return this.paintingsService.findOne(Number(id));
    }

    @Delete(":id")
    delete(@Param() id: string) {
        return this.paintingsService.delete(Number(id));
    }
}

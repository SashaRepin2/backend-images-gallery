import { Controller, Get, Post, Delete, Body, Param, UsePipes } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { CreatePaintingDto } from "./dto/create-painting.dto";
import { PaintingsService } from "./paintings.service";

@ApiTags("paintings")
@UsePipes(ValidationPipe)
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

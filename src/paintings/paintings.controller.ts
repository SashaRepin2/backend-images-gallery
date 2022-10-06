import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    UsePipes,
    HttpStatus,
    Query,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { CreatePaintingDto } from "./dto/create-painting.dto";
import PaginationPaintingsDto from "./dto/pagination-paintings.dto";
import { PaintingsModel } from "./models/paintings.model";
import { PaintingsService } from "./paintings.service";

@ApiTags("paintings")
@UsePipes(ValidationPipe)
@Controller("paintings")
export class PaintingsController {
    constructor(private readonly paintingsService: PaintingsService) {}

    @ApiOperation({ summary: "Создание картины" })
    @ApiResponse({
        type: PaintingsModel,
        status: HttpStatus.OK,
    })
    @Post()
    create(@Body() paintingDto: CreatePaintingDto) {
        return this.paintingsService.create(paintingDto);
    }

    @ApiOperation({ summary: "Получение всех картин" })
    @ApiResponse({
        type: [PaintingsModel],
        status: HttpStatus.OK,
    })
    @Get()
    findAll(@Query() queryParams: PaginationPaintingsDto) {
        return this.paintingsService.findAll(queryParams);
    }

    @ApiOperation({ summary: "Получение картины" })
    @ApiResponse({
        type: PaintingsModel,
        status: HttpStatus.OK,
    })
    @Get(":id")
    findOne(@Param() id: string) {
        return this.paintingsService.findOne(Number(id));
    }

    @ApiOperation({ summary: "Удаление картины" })
    @ApiResponse({
        type: PaintingsModel,
        status: HttpStatus.OK,
    })
    @Delete(":id")
    delete(@Param() id: string) {
        return this.paintingsService.delete(Number(id));
    }
}

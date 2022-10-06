import { Controller, Get, Post, Delete, Body, UsePipes, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { AuthorsService } from "./authors.service";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { AuthorsModel } from "./models/authors.model";

@ApiTags("authors")
@UsePipes(ValidationPipe)
@Controller("authors")
export class AuthorsController {
    constructor(private readonly authorsService: AuthorsService) {}
    @ApiOperation({ summary: "Создание автора" })
    @ApiResponse({
        type: AuthorsModel,
        status: HttpStatus.OK,
    })
    @Post()
    create(@Body() authorDto: CreateAuthorDto) {
        return this.authorsService.create(authorDto);
    }

    @ApiOperation({ summary: "Получение всех авторов" })
    @ApiResponse({
        type: [AuthorsModel],
        status: HttpStatus.OK,
    })
    @Get()
    findAll() {
        return this.authorsService.findAll();
    }

    @ApiOperation({ summary: "Получение автора" })
    @ApiResponse({
        type: AuthorsModel,
        status: HttpStatus.OK,
    })
    @Get(":id")
    findOne() {
        return this.authorsService.findOne(1);
    }

    @ApiOperation({ summary: "Удаление автора" })
    @ApiResponse({
        type: AuthorsModel,
        status: HttpStatus.OK,
    })
    @Delete()
    delete() {
        return this.authorsService.delete(1);
    }
}

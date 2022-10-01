import { Controller, Get, Post, Delete, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthorsService } from "./authors.service";
import { CreateAuthorDto } from "./dto/create-author.dto";

@ApiTags("authors")
@Controller("authors")
export class AuthorsController {
    constructor(private readonly authorsService: AuthorsService) {}

    @Get()
    findAll() {
        return this.authorsService.findAll();
    }

    @Post()
    create(@Body() authorDto: CreateAuthorDto) {
        return this.authorsService.create(authorDto);
    }

    @Get(":id")
    findOne() {
        return this.authorsService.findOne(1);
    }

    @Delete()
    delete() {
        return this.authorsService.delete(1);
    }
}

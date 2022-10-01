import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { AuthorsModel } from "./models/authors.model";

@Injectable()
export class AuthorsService {
    constructor(@InjectModel(AuthorsModel) private authorsRepository: typeof AuthorsModel) {}

    async create(authorDto: CreateAuthorDto) {
        const author = this.authorsRepository.create(authorDto);

        return author;
    }

    async findAll() {
        return this.authorsRepository.findAll();
    }

    async findOne(authorId: number) {
        const author = this.authorsRepository.findByPk(authorId);

        if (!author) {
            new HttpException("Автор не найден", HttpStatus.BAD_REQUEST);
        }

        return author;
    }

    async delete(authorId: number) {
        const author = this.authorsRepository.destroy({ where: { id: authorId } });

        if (!author) {
            new HttpException("Автор не найден", HttpStatus.BAD_REQUEST);
        }

        return author;
    }
}

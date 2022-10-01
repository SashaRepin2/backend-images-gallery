import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { AuthorsModel } from "./models/authors.model";

@Injectable()
export class AuthorsService {
    constructor(@InjectModel(AuthorsModel) private authorsRepository: typeof AuthorsModel) {}

    async create(authorDto: CreateAuthorDto): Promise<AuthorsModel> {
        return this.authorsRepository.create(authorDto);
    }

    async findAll(): Promise<AuthorsModel[]> {
        return this.authorsRepository.findAll();
    }

    async findOne(authorId: number): Promise<AuthorsModel> {
        const author = this.authorsRepository.findByPk(authorId);

        if (!author) {
            new HttpException("Автор не найден", HttpStatus.BAD_REQUEST);
        }

        return author;
    }

    async delete(authorId: number): Promise<AuthorsModel> {
        const author = this.authorsRepository.findByPk(authorId);

        if (!author) {
            new HttpException("Автор не найден", HttpStatus.BAD_REQUEST);
        }

        this.authorsRepository.destroy({ where: { id: authorId } });

        return author;
    }
}

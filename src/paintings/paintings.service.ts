import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePaintingDto } from "./dto/create-painting.dto";
import { PaintingsModel } from "./models/paintings.model";

@Injectable()
export class PaintingsService {
    constructor(@InjectModel(PaintingsModel) private paintingsRepository: typeof PaintingsModel) {}

    async create(paintingDto: CreatePaintingDto) {
        const painting = this.paintingsRepository.create(paintingDto);

        return painting;
    }

    async findOne(paintingId: number) {
        const painting = this.paintingsRepository.findByPk(paintingId);

        if (!painting) {
            new HttpException("Местоположение не найдено", HttpStatus.BAD_REQUEST);
        }

        return painting;
    }

    async findAll() {
        const paintings = this.paintingsRepository.findAll();

        return paintings;
    }

    async delete(paintingId: number) {
        const painting = this.paintingsRepository.destroy({ where: { id: paintingId } });

        if (!painting) {
            new HttpException("Местоположение не найдено", HttpStatus.BAD_REQUEST);
        }

        return painting;
    }
}

import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePaintingDto } from "./dto/create-painting.dto";
import { PaintingsModel } from "./models/paintings.model";

@Injectable()
export class PaintingsService {
    constructor(@InjectModel(PaintingsModel) private paintingsRepository: typeof PaintingsModel) {}

    async create(paintingDto: CreatePaintingDto): Promise<PaintingsModel> {
        return this.paintingsRepository.create(paintingDto);
    }

    async findOne(paintingId: number): Promise<PaintingsModel> {
        const painting = this.paintingsRepository.findByPk(paintingId);

        if (!painting) {
            new HttpException("Местоположение не найдено", HttpStatus.BAD_REQUEST);
        }

        return painting;
    }

    async findAll(): Promise<PaintingsModel[]> {
        return this.paintingsRepository.findAll();
    }

    async delete(paintingId: number): Promise<PaintingsModel> {
        const painting = this.paintingsRepository.findByPk(paintingId);

        if (!painting) {
            new HttpException("Местоположение не найдено", HttpStatus.BAD_REQUEST);
        }

        this.paintingsRepository.destroy({ where: { id: paintingId } });

        return painting;
    }
}

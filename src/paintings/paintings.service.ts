import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Repository } from "sequelize-typescript";
import { CreatePaintingDto } from "./dto/create-painting.dto";
import PaginationPaintingsDto from "./dto/pagination-paintings.dto";
import { PaintingsModel } from "./models/paintings.model";

@Injectable()
export class PaintingsService {
    constructor(
        @InjectModel(PaintingsModel) private paintingsRepository: Repository<PaintingsModel>
    ) {}

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

    async findAll(queryParams: PaginationPaintingsDto): Promise<any> {
        const { page, limit } = queryParams;

        if (page || limit) {
            return await this.paginationFindAll({ page, limit });
        }

        const { rows, count } = await this.paintingsRepository.findAndCountAll({
            include: { all: true },
        });

        return {
            data: rows,
            countAll: count,
        };
    }

    async delete(paintingId: number): Promise<PaintingsModel> {
        const painting = this.paintingsRepository.findByPk(paintingId);

        if (!painting) {
            new HttpException("Местоположение не найдено", HttpStatus.BAD_REQUEST);
        }

        this.paintingsRepository.destroy({ where: { id: paintingId } });

        return painting;
    }

    private async paginationFindAll(pagParams: PaginationPaintingsDto): Promise<any> {
        const page = Number(pagParams.page) ?? 1;
        const limit = Number(pagParams.limit) ?? 10;

        const offset = limit * (page - 1);

        const { rows, count } = await this.paintingsRepository.findAndCountAll({
            include: { all: true },
            limit,
            offset,
        });

        return {
            data: rows,
            currPage: page,
            countAll: count,
            countPerPage: limit,
            isNextPage: offset + limit,
            isPrevPage: limit <= offset,
        };
    }
}

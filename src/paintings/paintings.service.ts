import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
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
        const { page, limit, search } = queryParams;

        if (page || limit) {
            return await this.paginationFindAll({ page, limit, search });
        }

        const { rows, count } = await this.paintingsRepository.findAndCountAll({
            include: { all: true },
            where: {
                name: {
                    [Op.substring]: search || "",
                },
            },
        });

        return {
            count,
            data: rows,
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
        const page = Number(pagParams.page) || 1;
        const limit = Number(pagParams.limit) || 10;
        const search = pagParams.search || "";

        const offset = limit * (page - 1);

        const { rows, count } = await this.paintingsRepository.findAndCountAll({
            include: { all: true },

            where: {
                name: {
                    [Op.substring]: search,
                },
            },
            offset,
            limit,
        });

        return {
            data: rows,
            page,
            count,
            limit,
            isNextPage: offset + limit < count,
            isPrevPage: limit <= offset,
        };
    }
}

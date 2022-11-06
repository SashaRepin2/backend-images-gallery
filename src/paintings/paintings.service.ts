import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { Repository } from "sequelize-typescript";
import { CreatePaintingDto } from "./dto/create-painting.dto";
import PaginationPaintingsDto from "./dto/pagination-paintings.dto";
import { PaintingsModel } from "./models/paintings.model";

interface IDynamicalObj {
    [key: string]: any;
}

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
        return await this.paginationFindAll(queryParams);
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
        const queryStatement = this.getQueryParamsForPainting(pagParams);

        const { rows, count } = await this.paintingsRepository.findAndCountAll({
            include: { all: true },
            ...queryStatement,
        });

        return {
            data: rows,
            count,
        };
    }

    private getQueryParamsForPainting(pagParams: PaginationPaintingsDto) {
        const whereStatement: IDynamicalObj = {};

        if (pagParams.search) {
            whereStatement.name = { [Op.substring]: pagParams.search };
        }

        if (pagParams.author) {
            whereStatement["$author.name$"] = {
                [Op.like]: `${pagParams.author}%`,
            };
        }

        if (pagParams.location) {
            whereStatement["$location.location$"] = {
                [Op.substring]: pagParams.location,
            };
        }

        if (pagParams.startYear && pagParams.endYear) {
            whereStatement.created = {
                [Op.between]: [pagParams.startYear, pagParams.endYear],
            };
        }

        const paginationStatement: IDynamicalObj = {};

        if (pagParams.page || pagParams.limit) {
            paginationStatement.offset = pagParams.limit * (pagParams.page - 1);
            paginationStatement.page = pagParams.page;
        }

        return { where: { ...whereStatement }, ...paginationStatement };
    }
}

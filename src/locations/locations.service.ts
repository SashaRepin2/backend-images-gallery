import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateLocationDto } from "./dto/create-location.dto";
import { LocationsModel } from "./models/locations.model";

@Injectable()
export class LocationsService {
    constructor(@InjectModel(LocationsModel) private locationsRepository: typeof LocationsModel) {}

    async create(locationDto: CreateLocationDto): Promise<LocationsModel> {
        return this.locationsRepository.create(locationDto);
    }

    async findAll(): Promise<LocationsModel[]> {
        return this.locationsRepository.findAll();
    }

    async findOne(locationId: number): Promise<LocationsModel> {
        const location = this.locationsRepository.findByPk(locationId);

        if (!location) {
            new HttpException("Местоположение не найдено", HttpStatus.BAD_REQUEST);
        }

        return location;
    }

    async delete(locationId: number): Promise<LocationsModel> {
        const location = this.locationsRepository.findByPk(locationId);

        if (!location) {
            new HttpException("Местоположение не найдено", HttpStatus.BAD_REQUEST);
        }

        this.locationsRepository.destroy({ where: { id: locationId } });

        return location;
    }
}

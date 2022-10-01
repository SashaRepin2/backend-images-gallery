import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateLocationDto } from "./dto/create-location.dto";
import { LocationsModel } from "./models/locations.model";

@Injectable()
export class LocationsService {
    constructor(@InjectModel(LocationsModel) private locationsRepository: typeof LocationsModel) {}

    async create(locationDto: CreateLocationDto) {
        const location = this.locationsRepository.create(locationDto);

        return location;
    }

    async findAll() {
        const locations = this.locationsRepository.findAll();

        return locations;
    }

    async findOne(locationId: number) {
        const location = this.locationsRepository.findByPk(locationId);

        if (!location) {
            new HttpException("Местоположение не найдено", HttpStatus.BAD_REQUEST);
        }

        return location;
    }

    async delete(locationId: number) {
        const location = this.locationsRepository.destroy({ where: { id: locationId } });

        if (!location) {
            new HttpException("Местоположение не найдено", HttpStatus.BAD_REQUEST);
        }

        return location;
    }
}

import { ApiQuery, ApiProperty } from "@nestjs/swagger";

export default class PaginationPaintingsDto {
    page?: number;
    search?: string;
    limit?: number;
}

import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { MaterialInformationDtos } from 'src/dto/SectionInformationDtos';
import { MaterialService } from 'src/service/material.service';

@Controller('api/v1/material')
export class MaterialController {
    constructor(private materialService: MaterialService) {}

    @Post('save_material')
    saveMaterialController(@Body() materialInformationDtos: MaterialInformationDtos) {
        return this.materialService.saveMaterial(materialInformationDtos);
    }

    @Delete('delete_material/:id') 
    deleteMaterialController(@Param('id') id: number) {
        return this.materialService.deleteMaterial(id);
    }
}
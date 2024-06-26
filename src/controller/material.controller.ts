import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { MaterialInformationDtos } from 'src/dto/SectionInformationDtos';
import { UpdateMaterialAccess } from 'src/dto/UpdateMaterialAccessDtos';
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

    @Post('update_material_sum_click/:id')
    updateMaterialController(@Param('id') materialId: number, @Req() request: Request, @Body() updateMaterialAccess: UpdateMaterialAccess) {
        const studentId = request['user'].sub;
        const { numClickInAmountOfTime } = updateMaterialAccess;

        return this.materialService.updateMaterialSumClick(materialId, studentId, numClickInAmountOfTime);
    }
}
import { Controller, Post, Body, Logger } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { SectionInformationDtos } from 'src/dto/SectionInformationDtos';
import { SectionService } from 'src/service/section.service';

@Controller('api/v1/section/')
export class SectionController {
    constructor(private sectionService: SectionService) {}

    @Public()
    @Post('create_section')
    verifyUserLoginController(@Body() sectionInformationDtos: SectionInformationDtos) {
        Logger.log(sectionInformationDtos);
        
        return this.sectionService.createSection(sectionInformationDtos);
    }
}

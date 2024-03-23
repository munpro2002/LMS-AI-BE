import { COURSELANGUAGE } from "src/enums/CourseLanguage.enum"
import { COURSECATEGORY } from "src/enums/CourseCategory.enum"
import { COURSELEVEL } from "src/enums/CourseLevel.enum"

export class CourseInformationDtos {
    title: string
    description: string
    language: COURSELANGUAGE
    category: COURSECATEGORY
    level: COURSELEVEL
    thumbnailPath: string;
    trailerPath: string;
    teacherInChargeIds: number[]
}

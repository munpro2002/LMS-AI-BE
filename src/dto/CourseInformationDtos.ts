import { COURSELANGUAGE } from "src/enums/CourseLanguage.enum"
import { COURSECATEGORY } from "src/enums/CourseCategory.enum"
import { COURSELEVEL } from "src/enums/CourseLevel.enum"

export class CourseInformationDtos {
    title: string
    subTitle: string
    language: COURSELANGUAGE
    category: COURSECATEGORY
    level: COURSELEVEL
    duration: number // in weeks
    adminId: number
    teacherInChargeIds: number[]
}

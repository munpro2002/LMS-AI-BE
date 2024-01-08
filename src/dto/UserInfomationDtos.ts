import { UserLoginCredentialsDto } from "./UserLoginCredentialsDto";
import { COURSECATEGORY } from "src/enums/CourseCategory.enum";

export class UserInformationDto extends UserLoginCredentialsDto {
    name: string;
    specialist?: COURSECATEGORY;
}
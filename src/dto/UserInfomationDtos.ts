import { USERROLE } from "src/enums/UserRole.enum";
import { UserLoginCredentialsDto } from "./UserLoginCredentialsDto";
import { COURSECATEGORY } from "src/enums/CourseCategory.enum";

export class UserInformationDto extends UserLoginCredentialsDto {
    name: string;
    region?: string;
    highest_education?: string;
    age_band?: string;
    disability: boolean;
    specialist?: COURSECATEGORY;
    role: USERROLE;
}
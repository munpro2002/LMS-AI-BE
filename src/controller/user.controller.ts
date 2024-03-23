import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserLoginCredentialsDto } from 'src/dto/UserLoginCredentialsDto';
import { UserInformationDto } from 'src/dto/UserInfomationDtos';
import { UserService } from 'src/service/user.service';
import { Public } from 'src/decorator/public.decorator';

@Controller('api/v1/user/')
export class UserController {
    constructor(private userService: UserService) {}

    @Public()
    @Post('user_login')
    verifyUserLoginController(@Body() userLoginCredentialsDto: UserLoginCredentialsDto) {
        return this.userService.verifyUserLoginCredentials(userLoginCredentialsDto)
    }

    // Student registration
    @Public()
    @Post('user_register')
    registerUserController(@Body() userInformationDto: UserInformationDto) {
        return this.userService.registerNewUser(userInformationDto)
    }

    // Teacher account create by admin
    @Post('user_create')
    createUserController(@Body() userInformationDto: UserInformationDto) {
        return this.userService.createNewUser(userInformationDto)
    }

    @Get('get_available_teachers')
    getAvailableTeachersController() {
        return this.userService.getAvailableTeachers();
    }
}

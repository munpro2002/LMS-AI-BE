import { Controller, Post, Body, Logger } from '@nestjs/common';
import { UserLoginCredentialsDto } from 'src/dto/UserLoginCredentialsDto';
import { UserInformationDto } from 'src/dto/UserInfomationDtos';
import { UserService } from 'src/service/user.service';

@Controller('api/v1/user/')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('user_login')
    verifyUserLoginController(@Body() userLoginCredentialsDto: UserLoginCredentialsDto) {
        return this.userService.verifyUserLoginCredentials(userLoginCredentialsDto)
    }

    // Student registration
    @Post('user_register')
    registerUserController(@Body() userInformationDto: UserInformationDto) {
        this.userService.checkEmailExist(userInformationDto.email);

        return this.userService.registerNewUser(userInformationDto)
    }

    // Teacher account create by admin
    @Post('user_create')
    createUserController(@Body() userInformationDto: UserInformationDto) {
        this.userService.checkEmailExist(userInformationDto.email);

        return this.userService.createNewUser(userInformationDto)
     }
}

import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { AuthService } from './auth.service';
import { Public } from './constant';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('register')
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.registerUser(registerUserDto)
    }

    @Public()
    @Post('login')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto)
    }

    @Get('profile')
    getProfile(@Req() req) {    
        return this.authService.getProfile(req.user.username)
    }
}

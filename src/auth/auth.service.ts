import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    registerUser(registerUserDto: RegisterUserDto) {
        return this.usersService.registerUser(registerUserDto)
    }

    login(loginUserDto: LoginUserDto) {
        return this.usersService.login(loginUserDto)
    }

    getProfile(username: string) {
        return this.usersService.getProfile(username)
    }
}

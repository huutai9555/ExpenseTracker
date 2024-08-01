import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/creater-user.dto';
import { RegisterUserDto } from 'src/auth/dtos/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constant';
import { LoginUserDto } from 'src/auth/dtos/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    const hasUser = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :username', {
        username: registerUserDto.username,
      })
      .getOne();
    if (hasUser) {
      throw new BadRequestException(
        'This username has been taken. Please try another!!',
      );
    }
    await this.usersRepository
      .createQueryBuilder('user')
      .insert()
      .values([{ ...registerUserDto }])
      .execute();
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :username', {
        username: registerUserDto.username,
      })
      .getOne();
    const payload = { sub: user.id, username: user.username };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });
    return {
      username: user.username,
      access_token,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username: loginUserDto.username })
      .getOne();
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.password !== loginUserDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });
    return {
      username: user.username,
      access_token,
    };
  }


  async getProfile(username: string) {
    return await this.usersRepository.createQueryBuilder("user").where("username = :username", {username}).getOne();  
  }
}

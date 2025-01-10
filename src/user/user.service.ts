import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {DbService} from "../db/db.service";
import {RegisterUserDto} from "./dto/register-user.dto";
import {User} from "./entities/user.entity";
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class UserService {

  @Inject(DbService)
  dbService: DbService;
  async register(registerUserDto: RegisterUserDto) {
    //数据读取
    const users: User[] = await this.dbService.read();
    //数据查询
    const foundUser = users.find(item=>item.username === registerUserDto.username);
    if (foundUser){
      throw new BadRequestException('该用户已注册');
    }
    //数据创建
    const user = new User();
    user.username = registerUserDto.username;
    user.password = registerUserDto.password;
    users.push(user);
    //数据写入
    await this.dbService.write(users);
    //数据返回
    return user;
  }

  async login(loginUserDto: LoginUserDto){
    const users: User[] = await this.dbService.read();

    const foundUser = users.find(item=>item.username === loginUserDto.username);
    if (!foundUser){
      throw new BadRequestException('用户名错误')
    }
    if (foundUser.password !== loginUserDto.password){
      throw new BadRequestException('密码错误')
    }
    return foundUser;
  }
}

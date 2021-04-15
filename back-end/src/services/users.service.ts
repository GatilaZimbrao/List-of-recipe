import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUsersParcialInfo } from 'src/typings/global';
import { Repository } from 'typeorm';
import { Users } from '../database/entities/users.entity';
var cryptographyHandler = require('../handler/cryptographyHandler');

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  generateToken(id: number, login: string): string {
    return this.jwtService.sign(
      { id, login },
      {
        expiresIn: 99000,
      },
    );
  }

  getUserInfoByToken(token: string): Users {
    return this.jwtService.verify(token);
  }

  async createUser(requestBody: any): Promise<IUsersParcialInfo> {
    const user = new Users();

    user.nome = requestBody.Name;
    user.login = requestBody.Login;
    user.senha = cryptographyHandler.encryptPassword(requestBody.Password);

    const response: IUsersParcialInfo = {
      id: user.id,
      nome: user.nome,
      login: user.login,
    };

    this.usersRepository.save(user);

    return response;
  }

  async getUser(login: string): Promise<Users> {
    return this.usersRepository.findOne({ where: { login: login } });
  }

  async loginUser(requestBody: any): Promise<string> {
    const userLogin = await this.getUser(requestBody.Login);
    if (userLogin) {
      if (
        cryptographyHandler.verifyPassword(
          requestBody.Password,
          userLogin.senha,
        )
      ) {
        const token = this.generateToken(userLogin.id, userLogin.login);
        this.getUserInfoByToken(token);
        return token;
      } else throw new Error();
    } else throw new Error();
  }
}

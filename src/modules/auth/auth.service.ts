import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findOne(signInDto.username);
    if (user && user.password === signInDto.pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(signInDto: SignInDto) {
    const payload = { username: signInDto.username, sub: signInDto.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(signUpDto: SignUpDto) {
    return `This action returns all auth`;
  }
}

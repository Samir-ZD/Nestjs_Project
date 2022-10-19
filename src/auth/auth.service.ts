import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    try {
      if (user) {
        const matched = comparePasswords(password, user.password);
        if (matched) {
          console.log('success');
          return user;
        } else {
          console.log('Email or Password is Wrong');
        }
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async login(user: any) {
    const payLoad = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payLoad),
    };
  }
}

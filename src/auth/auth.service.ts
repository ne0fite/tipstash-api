import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  static SALT_ROUNDS = 10;

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticate(inputEmail: string, inputPassword: string) {
    // const hashed = await bcrypt.hash(inputPassword, AuthService.SALT_ROUNDS);
    // console.log(hashed);

    const user = await this.usersService.findByEmail(inputEmail);
    if (user == null) {
      throw new UnauthorizedException('Invalid Username or Password');
    }

    const { email, id, password } = user;

    const compareResult = await bcrypt.compare(inputPassword, password);

    if (!compareResult) {
      throw new UnauthorizedException('Invalid Username or Password');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      id,
      email,
      accessToken,
    };
  }
}

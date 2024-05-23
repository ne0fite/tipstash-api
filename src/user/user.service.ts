import { Inject, Injectable } from '@nestjs/common';
import User from '../models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPO')
    private userRepository: typeof User,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}

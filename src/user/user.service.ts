import { Inject, Injectable } from '@nestjs/common';
import User from '../models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPO')
    private userRepository: typeof User,
  ) {}

  findById(id: string): Promise<User | undefined> {
    return this.userRepository.findByPk(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.scope('full').findOne({
      where: {
        email,
      },
    });
  }
}

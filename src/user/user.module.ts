import { Module } from '@nestjs/common';

import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  exports: [UserService],
  providers: [...userProviders, UserService],
})
export class UserModule {}

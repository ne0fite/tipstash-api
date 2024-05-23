import { Module } from '@nestjs/common';

import { accountProviders } from './account.providers';

@Module({
  providers: [...accountProviders],
})
export class AccountModule {}

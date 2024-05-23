import { Module } from '@nestjs/common';

import { databaseProviders } from './database/database.providers';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { JobModule } from './job/job.module';
import { ShiftModule } from './shift/shift.module';
import { AuthModule } from './auth/auth.module';
import { ImportModule } from './import/import.module';
import { AppController } from './app/app.controller';

@Module({
  imports: [
    UserModule,
    AccountModule,
    JobModule,
    ShiftModule,
    AuthModule,
    ImportModule,
  ],
  controllers: [AppController],
  providers: [...databaseProviders],
})
export class AppModule {}

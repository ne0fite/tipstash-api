import { Module } from '@nestjs/common';

import { jobProviders } from './job.providers';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { UserModule } from 'src/user/user.module';

@Module({
  exports: [JobService],
  imports: [UserModule],
  controllers: [JobController],
  providers: [...jobProviders, JobService],
})
export class JobModule {}

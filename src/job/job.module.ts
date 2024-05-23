import { Module } from '@nestjs/common';

import { jobProviders } from './job.providers';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  exports: [JobService],
  controllers: [JobController],
  providers: [...jobProviders, JobService],
})
export class JobModule {}

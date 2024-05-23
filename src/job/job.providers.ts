import Job from '../models/job.entity';

export const jobProviders = [
  {
    provide: 'JOB_REPO',
    useValue: Job,
  },
];

import { Inject, Injectable } from '@nestjs/common';
import Job from '../models/job.entity';

@Injectable()
export class JobService {
  constructor(@Inject('JOB_REPO') private repository: typeof Job) {}

  find() {
    return this.repository.findAll({
      order: [['name', 'asc']],
    });
  }

  getById(id) {
    return this.repository.findByPk(id);
  }

  async save(job: Job): Promise<Job> {
    if (job.defaultJob) {
      await this.repository.update(
        {
          defaultJob: false,
        },
        {
          where: {
            accountId: job.accountId,
          },
        },
      );
    }

    return job.save();
  }
}

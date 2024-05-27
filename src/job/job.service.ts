import { Inject, Injectable } from '@nestjs/common';
import Job from '../models/job.entity';
import { Op } from 'sequelize';

@Injectable()
export class JobService {
  constructor(@Inject('JOB_REPO') private repository: typeof Job) {}

  find(accountId: string) {
    return this.repository.findAll({
      where: {
        accountId,
      },
      order: [['name', 'asc']],
    });
  }

  getById(id, accountId) {
    return this.repository.findOne({
      where: {
        id,
        accountId,
      },
    });
  }

  async save(job: Job): Promise<Job> {
    const savedJob = await job.save();

    if (job.defaultJob) {
      await this.repository.update(
        {
          defaultJob: false,
        },
        {
          where: {
            accountId: job.accountId,
            id: {
              [Op.ne]: savedJob.id,
            },
          },
        },
      );
    }

    return savedJob;
  }
}

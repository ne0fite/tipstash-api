import { Inject, Injectable, Logger } from '@nestjs/common';
import Job from '../models/job.entity';
import Shift from '../models/shift.entity';
import { ShiftService } from '../shift/shift.service';

@Injectable()
export class ImportService {
  private readonly logger = new Logger(ImportService.name);

  constructor(
    @Inject('JOB_REPO') private jobRepository: typeof Job,
    private shiftService: ShiftService,
  ) {}

  async importShiftJson(shiftData: any[]) {
    const jobMap = new Map<string, Job>();
    const result = {
      imported: 0,
      errors: 0,
    };

    for (let rowNum = 0; rowNum < shiftData.length; rowNum++) {
      const shiftJson = shiftData[rowNum];

      const {
        'Job Name': jobName,
        ' Tip Amount ': amount,
        ' Tip Out ': tipOut,
        'Work Date': date,
        'Clock In': clockIn,
        'Clock Out': clockOut,
        ' Sales ': sales,
        Notes: notes = '',
      } = shiftJson;

      let job = jobMap.get(jobName);
      if (job == null) {
        job = await this.jobRepository.findOne({
          where: {
            name: jobName,
          },
        });
        if (!job) {
          job = new Job({ name: jobName });
          await job.save();
        }
        jobMap.set(jobName, job);
      }

      const shift = new Shift({
        jobId: job.id,
        date: this.excelDateToJSDate(date),
        clockIn: this.excelDateToJSDate(clockIn),
        clockOut: this.excelDateToJSDate(clockOut),
        amount,
        sales,
        tipOut,
        notes,
      });

      shift.job = job;

      try {
        await this.shiftService.save(shift);
        result.imported++;
      } catch (error) {
        result.errors++;
        this.logger.error(
          `Error import shift at row ${rowNum + 1}: ${error.message}`,
        );
      }
    }

    return result;
  }

  excelDateToJSDate(date) {
    return new Date(Math.round((date - 25569) * 86400 * 1000));
  }
}

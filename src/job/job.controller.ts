import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';

import { AuthGuard } from 'src/auth/auth.guard';
import Job from '../models/job.entity';

@Controller('/api/v1/job')
@UseGuards(AuthGuard)
export class JobController {
  constructor(private jobService: JobService) {}

  @Get('')
  find() {
    return this.jobService.find();
  }

  @Get(':id')
  async getById(@Param() params: any) {
    const job = await this.jobService.getById(params.id);
    if (!job) {
      throw new NotFoundException('Job Not Found');
    }
    return job;
  }

  @Post('')
  async create(@Body() body: any) {
    const job = new Job(body);
    await job.save();
    return job;
  }

  @Post(':id')
  async update(@Param() params: any, @Body() body: any) {
    const job = await this.jobService.getById(params.id);
    if (!job) {
      throw new NotFoundException('Job Not Found');
    }
    job.update(body);
    await job.save();
    return job;
  }

  @Delete(':id')
  async delete(@Param() params: any) {
    const job = await this.jobService.getById(params.id);
    if (!job) {
      throw new NotFoundException('Job Not Found');
    }
    await job.destroy();
    return job;
  }
}

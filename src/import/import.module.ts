import { Module } from '@nestjs/common';
import { ImportService } from './import.service';
import { ImportController } from './import.controller';
import { shiftProviders } from '../shift/shift.providers';
import { jobProviders } from '../job/job.providers';
import { ShiftService } from '../shift/shift.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [ImportService, ...shiftProviders, ...jobProviders, ShiftService],
  controllers: [ImportController],
})
export class ImportModule {}

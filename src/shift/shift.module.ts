import { Module } from '@nestjs/common';
import { ShiftController } from './shift.controller';

import { shiftProviders } from './shift.providers';
import { ShiftService } from './shift.service';

@Module({
  exports: [ShiftService],
  controllers: [ShiftController],
  providers: [...shiftProviders, ShiftService],
})
export class ShiftModule {}

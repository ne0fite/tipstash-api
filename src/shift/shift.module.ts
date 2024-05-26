import { Module } from '@nestjs/common';
import { ShiftController } from './shift.controller';

import { shiftProviders } from './shift.providers';
import { ShiftService } from './shift.service';
import { UserModule } from 'src/user/user.module';

@Module({
  exports: [ShiftService],
  imports: [UserModule],
  controllers: [ShiftController],
  providers: [...shiftProviders, ShiftService],
})
export class ShiftModule {}

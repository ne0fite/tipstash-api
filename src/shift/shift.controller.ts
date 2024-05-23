import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { ShiftService } from './shift.service';
import Shift from '../models/shift.entity';

@Controller('/api/v1/shift')
@UseGuards(AuthGuard)
export class ShiftController {
  constructor(private shiftService: ShiftService) {}

  @Get('')
  find(@Query() query) {
    return this.shiftService.find(query);
  }

  @Get(':id')
  async getById(@Param() params: any) {
    const shift = await this.shiftService.getById(params.id);
    if (!shift) {
      throw new NotFoundException('Shift Not Found');
    }
    return shift;
  }

  @Post('')
  async create(@Body() body: any) {
    const shift = new Shift(body);
    await this.shiftService.save(shift);
    return shift;
  }

  @Post(':id')
  async update(@Param() params: any, @Body() body: any) {
    const shift = await this.shiftService.getById(params.id);
    if (!shift) {
      throw new NotFoundException('Shift Not Found');
    }
    shift.update(body);
    await this.shiftService.save(shift);
    return shift;
  }

  @Delete(':id')
  async delete(@Param() params: any) {
    const shift = await this.shiftService.getById(params.id);
    if (!shift) {
      throw new NotFoundException('Shift Not Found');
    }
    await shift.destroy();
    return shift;
  }
}

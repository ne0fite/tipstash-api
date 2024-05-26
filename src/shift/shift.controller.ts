import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { ShiftService } from './shift.service';
import Shift from '../models/shift.entity';
import User from 'src/models/user.entity';

@Controller('/api/v1/shift')
@UseGuards(AuthGuard)
export class ShiftController {
  constructor(private shiftService: ShiftService) {}

  @Get('')
  find(@Query() query, @Request() request) {
    const user: User = request['user'];
    return this.shiftService.find(query, user.accountId);
  }

  @Get(':id')
  async getById(@Param() params: any, @Request() request) {
    const user: User = request['user'];
    const shift = await this.shiftService.getById(params.id, user.accountId);
    if (!shift) {
      throw new NotFoundException('Shift Not Found');
    }
    return shift;
  }

  @Post('')
  async create(@Body() body: any, @Request() request) {
    const shift = new Shift(body);
    const user: User = request['user'];
    shift.accountId = user.accountId;
    await this.shiftService.save(shift);
    return shift;
  }

  @Post(':id')
  async update(@Param() params: any, @Body() body: any, @Request() request) {
    const user: User = request['user'];
    const shift = await this.shiftService.getById(params.id, user.accountId);
    if (!shift) {
      throw new NotFoundException('Shift Not Found');
    }
    shift.update(body);
    await this.shiftService.save(shift);
    return shift;
  }

  @Delete(':id')
  async delete(@Param() params: any, @Request() request) {
    const user: User = request['user'];
    const shift = await this.shiftService.getById(params.id, user.accountId);
    if (!shift) {
      throw new NotFoundException('Shift Not Found');
    }
    await shift.destroy();
    return shift;
  }
}

import {
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as csv from 'csvtojson';

import { AuthGuard } from '../auth/auth.guard';
import { ImportService } from './import.service';
import User from 'src/models/user.entity';

@Controller('/api/v1/import')
@UseGuards(AuthGuard)
export class ImportController {
  constructor(private importService: ImportService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() request,
  ) {
    const json = await csv().fromString(file.buffer.toString());
    const user: User = request['user'];
    const result = await this.importService.importShiftJson(
      json,
      user.accountId,
    );
    return result;
  }
}

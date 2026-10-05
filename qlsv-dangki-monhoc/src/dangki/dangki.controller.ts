import { Body, Controller, Get, Post } from '@nestjs/common';
import { DangkiService } from './dangki.service.js';
import { RegisterDangkiDto } from './dto/register-dangki.dto.js';

@Controller('dangki')
export class DangkiController {
  constructor(private readonly dangkiService: DangkiService) {}

  @Post()
  registerDangki(@Body() dto: RegisterDangkiDto) {
    return this.dangkiService.registerDangki(dto);
  }

  @Get()
  listDangki() {
    return this.dangkiService.findAll();
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dangki } from '../entities/dangki.entity.js';
import { Monhoc } from '../entities/monhoc.entity.js';
import { Sinhvien } from '../entities/sinhvien.entity.js';
import { DangkiController } from './dangki.controller.js';
import { DangkiService } from './dangki.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Dangki, Sinhvien, Monhoc])],
  controllers: [DangkiController],
  providers: [DangkiService],
  exports: [DangkiService],
})
export class DangkiModule {}

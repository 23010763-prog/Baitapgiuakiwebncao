import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DangkiModule } from './dangki/dangki.module.js';
import { Dangki } from './entities/dangki.entity.js';
import { Monhoc } from './entities/monhoc.entity.js';
import { Sinhvien } from './entities/sinhvien.entity.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'qlsv-dangki.db',
      entities: [Sinhvien, Monhoc, Dangki],
      synchronize: true,
      logging: false,
    }),
    DangkiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

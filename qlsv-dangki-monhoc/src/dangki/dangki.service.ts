import { Injectable, OnModuleInit, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dangki } from '../entities/dangki.entity.js';
import { Monhoc } from '../entities/monhoc.entity.js';
import { Sinhvien } from '../entities/sinhvien.entity.js';
import { RegisterDangkiDto } from './dto/register-dangki.dto.js';

@Injectable()
export class DangkiService implements OnModuleInit {
  constructor(
    @InjectRepository(Dangki)
    private readonly dangkiRepository: Repository<Dangki>,
    @InjectRepository(Sinhvien)
    private readonly sinhvienRepository: Repository<Sinhvien>,
    @InjectRepository(Monhoc)
    private readonly monhocRepository: Repository<Monhoc>,
  ) {}

  async onModuleInit() {
    const studentCount = await this.sinhvienRepository.count();
    const subjectCount = await this.monhocRepository.count();

    if (studentCount === 0) {
      await this.sinhvienRepository.save([
        { masv: 'SV001', hoten: 'Nguyễn Văn A', email: 'a@university.edu.vn' },
        { masv: 'SV002', hoten: 'Trần Thị B', email: 'b@university.edu.vn' },
      ]);
    }

    if (subjectCount === 0) {
      await this.monhocRepository.save([
        { mamon: 'CS101', tenmon: 'Lập trình cơ bản', sotinchi: 3 },
        { mamon: 'WEB201', tenmon: 'Web Nâng cao', sotinchi: 4 },
      ]);
    }
  }

  async registerDangki(dto: RegisterDangkiDto): Promise<Dangki> {
    const sinhvien = await this.sinhvienRepository.findOne({ where: { masv: dto.masv } });
    if (!sinhvien) {
      throw new NotFoundException(`Không tìm thấy sinh viên với mã ${dto.masv}`);
    }

    const monhoc = await this.monhocRepository.findOne({ where: { mamon: dto.mamon } });
    if (!monhoc) {
      throw new NotFoundException(`Không tìm thấy môn học với mã ${dto.mamon}`);
    }

    const existing = await this.dangkiRepository.findOne({
      where: {
        sinhvien: { id: sinhvien.id },
        monhoc: { id: monhoc.id },
      },
      relations: ['sinhvien', 'monhoc'],
    });

    if (existing) {
      throw new ConflictException('Sinh viên đã đăng ký môn học này rồi');
    }

    const dangki = this.dangkiRepository.create({
      sinhvien,
      monhoc,
    });

    return this.dangkiRepository.save(dangki);
  }

  async findAll(): Promise<Dangki[]> {
    return this.dangkiRepository.find({
      relations: ['sinhvien', 'monhoc'],
      order: { id: 'DESC' },
    });
  }
}

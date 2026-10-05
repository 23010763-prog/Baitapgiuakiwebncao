import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Sinhvien } from './sinhvien.entity.js';
import { Monhoc } from './monhoc.entity.js';

@Entity('dangki')
export class Dangki {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sinhvien, (sinhvien: Sinhvien) => sinhvien.dangkis, {
    onDelete: 'CASCADE',
  })
  sinhvien: Sinhvien;

  @ManyToOne(() => Monhoc, (monhoc: Monhoc) => monhoc.dangkis, {
    onDelete: 'CASCADE',
  })
  monhoc: Monhoc;

  @CreateDateColumn()
  ngaydangki: Date;
}
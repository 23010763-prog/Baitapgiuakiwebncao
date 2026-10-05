import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Dangki } from './dangki.entity.js';

@Entity('monhoc')
export class Monhoc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  mamon: string;

  @Column()
  tenmon: string;

  @Column()
  sotinchi: number;

  @OneToMany(() => Dangki, (dangki: Dangki) => dangki.monhoc)
  dangkis: Dangki[];
}
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDangkiDto {
  @IsString()
  @IsNotEmpty()
  masv: string;

  @IsString()
  @IsNotEmpty()
  mamon: string;
}

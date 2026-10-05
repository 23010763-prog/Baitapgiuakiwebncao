import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'QLSV Dang Ky Mon Hoc API is running';
  }
}

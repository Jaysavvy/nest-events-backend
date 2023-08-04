import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getBye(): string {
    console.log(process.env);
    return 'bye';
  }
}

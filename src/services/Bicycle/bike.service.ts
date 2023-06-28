import { Injectable } from '@nestjs/common';

@Injectable()
export class BikeService {
  getHello(): string {
    return 'Hello World!!';
  }
  get(): string {
    return 'Hai'
  }
}

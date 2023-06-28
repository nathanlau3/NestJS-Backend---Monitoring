import { Controller, Get } from '@nestjs/common';
import { BikeService } from './bike.service';
import { Logger } from '@nestjs/common';

@Controller('test')
export class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  @Get()
  getHello(): string {
    setTimeout(function() {
      Logger.log('First');
      setTimeout(function() {
          Logger.log('Second');
          setTimeout(function() {
              Logger.log('Third');
              setTimeout(function() {
                  Logger.log('Fourth');
              }, 500);
          }, 1000);
      }, 500);
  }, 1000);
  // Logger.log("hellow")
    return this.bikeService.getHello();
  }
  get(): string {
    return this.bikeService.getHello();
  }

  @Get('test')
  hai(): string {
    return 'Haiiii'
  }
}

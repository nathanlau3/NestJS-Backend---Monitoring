import { Module } from '@nestjs/common';
import { BikeController } from './bike.controller';
import { BikeService } from './bike.service';

@Module({
  imports: [],
  controllers: [BikeController],
  providers: [BikeService],
})
export class BikeModule {}

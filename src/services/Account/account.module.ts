import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaService } from 'prisma/prisma.service';
import moment from 'moment'
@Module({  
  controllers: [AccountController],
  providers: [AccountService, PrismaService,  {
    provide: 'MomentWrapper',
    useValue: moment
  },]
})
export class AccountModule {}

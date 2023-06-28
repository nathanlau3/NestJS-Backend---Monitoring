import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountModule } from '../services/Account/account.module';
import { PrismaService } from 'prisma/prisma.service';
import { AccountService } from '../services/Account/account.service';

@Module({
  imports: [AccountModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, AccountService]
})
export class AuthModule {}

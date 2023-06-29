import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountModule } from '../services/Account/account.module';
import { PrismaService } from 'prisma/prisma.service';
import { AccountService } from '../services/Account/account.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [AccountModule, JwtModule.register({
    global: true,
    secret: "jwtConstants.secret",
    signOptions: {expiresIn: "3600s"}
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, AccountService, JwtService]
})
export class AuthModule {}

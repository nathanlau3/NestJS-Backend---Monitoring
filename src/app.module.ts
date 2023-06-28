import { Module } from '@nestjs/common';
import { AccountModule } from './services/Account/account.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [AccountModule, AuthModule],
})
export class AppModule {}

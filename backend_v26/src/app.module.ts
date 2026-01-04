import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './common/logger/logger.module';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/auth/user/user.module';
import { OtpAdminModule } from './modules/auth/otp/otp-admin.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    PrismaModule,
    AuthModule,
    UserModule,
    OtpAdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

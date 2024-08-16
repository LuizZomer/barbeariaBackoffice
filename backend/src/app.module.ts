import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, PermissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

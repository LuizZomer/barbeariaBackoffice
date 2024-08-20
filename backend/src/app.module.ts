import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permission.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';


@Module({
  imports: [UserModule, PrismaModule, AuthModule, PermissionModule, ConfigModule.forRoot(), CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

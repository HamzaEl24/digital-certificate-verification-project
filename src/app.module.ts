import { Module } from '@nestjs/common';
import { AuthModule } from './Admin/auth/auth.module';
import { UserModule } from './Admin/user.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [AuthModule, UserModule, PrismaModule],
 
})
export class AppModule {}

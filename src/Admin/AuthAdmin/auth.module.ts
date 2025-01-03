import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminAuthService } from './auth.service';
import { AdminAuthController } from './auth.controller';
import { AdminSchema } from '../Schema/Admin.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]), //Définition du modèle
    PassportModule,
    JwtModule.register({
      secret: '1234azert',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, JwtStrategy],
  exports: [AdminAuthService],
})
export class AdminAuthModule {}

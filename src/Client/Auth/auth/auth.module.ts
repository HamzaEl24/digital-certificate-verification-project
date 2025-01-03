import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/Client/local.strategy';
import { JwtStrategy } from 'src/Client/jwt.strategy';
import { ClientSchema } from'src/Client/schema/client.schema';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }]),
    JwtModule.register({
      secret: '1234azert', 
      signOptions: { expiresIn: '30d' }, 
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class ClientAuthModule {}





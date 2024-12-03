import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/Client/local.strategy';
import { JwtStrategy } from 'src/Client/jwt.strategy';
import { Client,ClientSchema } from '../../shema/client.schema';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    JwtModule.register({
      secret: 'azert1234', 
      signOptions: { expiresIn: '24h' }, 
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}





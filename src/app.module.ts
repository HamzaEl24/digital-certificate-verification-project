import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Client/Auth/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './Client/Enregistrer/multer.config';
import { RegisterModule } from './Client/Enregistrer/register.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    MulterModule.register(multerConfig),
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
    exclude: ['/*'],
    }),
    RegisterModule,
  ],
})
export class AppModule {}


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientAuthModule } from './Client/Auth/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './Client/Enregistrer/multer.config';
import { RegisterModule } from './Client/Enregistrer/register.module';
import { AdminAuthModule } from './Admin/AuthAdmin/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CertificateModule } from './certificates/certificates.module';
import { VerificationClientModule } from './Admin/VerificationClient/verificationClient.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ClientAuthModule,
    AdminAuthModule,
    MulterModule.register(multerConfig),
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
    exclude: ['/*'],
    }),
            
    
    CertificateModule,
    RegisterModule,
<<<<<<< HEAD
    CertificateModule,
    VerificationClientModule,
    
=======
    VerificationClientModule
>>>>>>> Ayoub2
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}


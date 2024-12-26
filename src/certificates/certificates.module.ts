import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Certificate, CertificateSchema } from './shemas/certificate.schema';
import { CertificateController } from './certificates.controller';
import { CertificateService } from './certificates.service';
// import { CertificateController } from './certificate.controller';
// import { CertificateService } from './certificate.service';
// import { Certificate, CertificateSchema } from './certificate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Certificate.name, schema: CertificateSchema }]),
  ],
  controllers: [CertificateController],
  providers: [CertificateService],
})
export class CertificateModule {}

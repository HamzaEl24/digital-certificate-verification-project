import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { Certificate, CertificateDocument } from './certificate.schema';
import { v4 as uuidv4 } from 'uuid';
import * as QRCode from 'qrcode';
import { Certificate, CertificateDocument } from './shemas/certificate.schema';

@Injectable()
export class CertificateService {
  constructor(
    @InjectModel(Certificate.name) private readonly certificateModel: Model<CertificateDocument>,
  ) {}

  async generateCertificates(clientId: string, individuals: { name: string; email: string }[]) {
    const certificates = await Promise.all(
      individuals.map(async (individual) => {
        const uniqueId = uuidv4();
        const qrCodeUrl = await QRCode.toDataURL(`http://localhost:3000/verify/${uniqueId}`);
        const certificate = new this.certificateModel({
          clientId,
          uniqueId,
          qrCodeUrl,
          name: individual.name,
          email: individual.email,
          isCertified: true,
        });

        return certificate.save();
      }),
    );

    return certificates;
  }

  async verifyCertificate(uniqueId: string) {
    const certificate = await this.certificateModel.findOne({ uniqueId });
    if (!certificate) {
      throw new NotFoundException('Certificate not found or invalid');
    }

    return {
      message: certificate.isCertified ? 'Certified' : 'Not Certified',
      details: certificate.isCertified ? certificate : null,
    };
  }
}

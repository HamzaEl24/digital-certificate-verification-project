import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as QRCode from 'qrcode';
import { Certificate, CertificateDocument } from './shemas/certificate.schema';

@Injectable()
export class CertificateService {
  constructor(
    @InjectModel(Certificate.name) private readonly certificateModel: Model<CertificateDocument>,
  ) {}

  async generateCertificates(clientId: string, individuals: { name: string; email: string; cause: string }[]) {
    const certificates = await Promise.all(
      individuals.map(async (individual) => {
        const uniqueId = uuidv4();  // Générer un uniqueId pour chaque certificat
        const qrCodeUrl = await QRCode.toDataURL(`http://localhost:3000/certificates/verify/${uniqueId}`);
        const certificate = new this.certificateModel({
          clientId,
          uniqueId,  // Utiliser uniqueId pour la vérification
          qrCodeUrl,
          name: individual.name,
          email: individual.email,
          cause: individual.cause,
          isCertified: true,
        });

        return certificate.save();
      }),
    );

    return certificates;
  }

  async verifyCertificate(uniqueId: string) {
    // Chercher le certificat en utilisant le uniqueId
    const certificate = await this.certificateModel.findOne({ uniqueId });
  
    // Si le certificat n'existe pas, lancer une exception NotFoundException
    if (!certificate) {
      throw new NotFoundException('Certificate not found or invalid');
    }
  
    // Retourner un message avec les détails de certification ou non certification
    return {
      message: certificate.isCertified ? 'Certified' : 'Not Certified',
      details: certificate.isCertified ? {
        name: certificate.name,
        email: certificate.email,
        cause: certificate.cause,  // pour la raison
        uniqueId: certificate.uniqueId,  // l affichae de uniqueID
        createdAt: certificate.createdAt,  // pour la date de creation
      } : null,
    };
  }
  
}

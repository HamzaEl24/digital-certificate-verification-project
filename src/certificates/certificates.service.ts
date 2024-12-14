// src/certificates/certificates.service.ts
import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class CertificatesService {
  async processList(people: { name: string; email: string }[], issuedBy: string) {
    const certificates = [];

    for (const person of people) {
      const uniqueId = this.generateUniqueId();
      const qrCode = await this.generateQrCode(uniqueId);

      const certificate = {
        name: person.name,
        email: person.email,
        issuedBy,
        uniqueId,
        qrCode,
      };

      certificates.push(certificate);
    }

    return certificates; // À envoyer au client ou enregistrer en DB
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase(); // Exemple : ID aléatoire
  }

  private async generateQrCode(data: string): Promise<string> {
    return QRCode.toDataURL(data);
  }
}

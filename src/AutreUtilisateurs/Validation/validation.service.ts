import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
    async validateCertificate(id?: string, qrCode?: string): Promise<any> {
    // Simulation de la bd
    const certificates = [
        {id: '1', qrCode:'abc123', donneur: 'John Doe', porteur: 'Ayoub Add'},
        {id: '2', qrCode:'def123', donneur: 'Alic', porteur: 'Add'},
    ];

    return certificates.find(
        cert => cert.id === id || cert.qrCode === qrCode,
    );
}
}
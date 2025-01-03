import { Controller, Post, Body, UseGuards, Request, Get, Param } from '@nestjs/common';
import { CertificateService } from './certificates.service';
import { JwtAuthGuard } from 'src/Client/Auth/guards/jwt-auth.guard';
import { CreateCertificatesDto } from './dto/submit-list.dto';
// import { CertificateService } from './certificate.service';
// import { CreateCertificatesDto } from './create-certificates.dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('certificates')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @UseGuards(new JwtAuthGuard(['client']))
  @Post('generate')
  async generateCertificates(@Body() dto: CreateCertificatesDto, @Request() req) {
    const clientId = req.user.id;
    const certificates = await this.certificateService.generateCertificates(clientId, dto.individuals);
    return {
      message: 'Certificates generated successfully',
      certificates,
    };
  }

  @Get('verify/:uniqueId')
  async verifyCertificate(@Param('uniqueId') uniqueId: string) {
    const result = await this.certificateService.verifyCertificate(uniqueId);
    return result;
  }
}

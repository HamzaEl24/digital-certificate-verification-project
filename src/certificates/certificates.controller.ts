import { Controller, Post, Body, UseGuards, Request, Get, Param } from '@nestjs/common';
import { CertificateService } from './certificates.service';
import { JwtAuthGuard } from 'src/Client/Auth/guards/jwt-auth.guard';
import { CreateCertificatesDto } from './dto/submit-list.dto';

@Controller('certificates')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @UseGuards(JwtAuthGuard)
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
    // Vérification avec le uniqueId uniquement
    const result = await this.certificateService.verifyCertificate(uniqueId);
    return result;
  }
}

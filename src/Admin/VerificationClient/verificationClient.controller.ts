import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { VerificationClientService } from './verificationClient.service';
import { IClient } from 'src/Client/schema/client.schema';
import { JwtAuthGuard } from '../AuthAdmin/guard/jwt-auth.guard';

@Controller('verification')
export class VerificationClientController {
    constructor(private readonly verificationClientService: VerificationClientService) {}

    // Récupère tous les clients inactifs
    @Get('inactifeClients')
    @UseGuards(new JwtAuthGuard(['admin']))
    async getInactiveClients(): Promise<IClient[]> {
        return this.verificationClientService.getInactiveClients();
    }

    // Valide un document d'un client
    @Post('validateDocument')
    @UseGuards(new JwtAuthGuard(['admin']))
    async validateDocument(
        @Body() body: { clientId: string; documentName: string }
    ): Promise<string> {
        return this.verificationClientService.updateDocumentStatus(body.clientId, body.documentName);
    }
}

import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { VerificationClientService } from './verificationClient.service';
import { IClient } from 'src/Client/schema/client.schema';
import { JwtAuthGuard } from '../AuthAdmin/guard/jwt-auth.guard';

@Controller('verification')
export class VerificationClientController {
    constructor(private readonly verificationClientService: VerificationClientService) {}

    // Récupère tous les clients inactifs
<<<<<<< HEAD
    /*@UseGuards(JwtAuthGuard)*/
    @Get('inactiveClients')
       async getInactiveClients(): Promise<IClient[]> {
=======
    @Get('inactifeClients')
    @UseGuards(new JwtAuthGuard(['admin']))
    async getInactiveClients(): Promise<IClient[]> {
>>>>>>> Ayoub2
        return this.verificationClientService.getInactiveClients();
    }

    // Valide un document d'un client
    @Post('validateDocument')
<<<<<<< HEAD
    /* @UseGuards(JwtAuthGuard)*/
=======
    @UseGuards(new JwtAuthGuard(['admin']))
>>>>>>> Ayoub2
    async validateDocument(
        @Body() body: { clientId: string; documentName: string }
    ): Promise<string> {
        return this.verificationClientService.updateDocumentStatus(body.clientId, body.documentName);
    }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IClient } from "src/Client/schema/client.schema";

@Injectable()
export class VerificationClientService {
    constructor(
        @InjectModel('Client') private readonly clientModel: Model<IClient>,
    ) {}

    // Met à jour le statut d'un document spécifique
    async updateDocumentStatus(clientId: string, documentName: string): Promise<string> {
        const client = await this.clientModel.findById(clientId).exec();

        if (!client) {
            throw new NotFoundException(`Client avec l'ID ${clientId} introuvable`);
        }

        const document = client.legalDocuments.find(doc => doc.documentName.toString() === documentName);

        if (!document) {
            throw new NotFoundException(`Document avec l'ID ${documentName} introuvable`);
        }

        if (document.validated) {
            return `Le document ${document.documentName} est déjà validé.`;
        }

        // Mettre à jour le statut du document
        document.validated = true;
        await client.save();

        // Vérifier si tous les documents sont validés
        const allDocumentsValid = client.legalDocuments.every(doc => doc.validated);

        if (allDocumentsValid) {
            client.status = 'active';
            await client.save();
            return `Tous les documents sont validés. Le client ${client.name} est maintenant activé.`;
        }

        return `Le document ${document.documentName} est validé, mais d'autres documents restent à valider.`;
    }

        // Récupère tous les clients inactifs et vérifie leur statut
        async getInactiveClients(): Promise<IClient[]> {
            return this.clientModel.find({ status: 'inactive' }).exec();
        }
}

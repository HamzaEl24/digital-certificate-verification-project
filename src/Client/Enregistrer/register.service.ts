import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {Client, ClientDocument } from '../../Client/shema/client.schema';


@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<ClientDocument>,
  ) {}

  async registerClient(data: any, files: any): Promise<Client> {
    const { name, email, password, phone, type } = data;

    // Vérifiez si l'email est déjà utilisé
    const existingClient = await this.clientModel.findOne({ email });
    if (existingClient) {
      throw new BadRequestException('Email is already registered.');
    }

    // Hachez le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

   
    // Traitement des fichiers justificatifs
    const legalDocuments = files.map((file) => ({
      documentName: file.originalname, // Nom original du fichier
      url: file.path,                 // Chemin où le fichier est stocké
      uploadedAt: new Date(),
      validated: false,               // Par défaut non validé
    }));

    // Création d'un nouveau client
    const newClient = new this.clientModel({
      name,
      email,
      password: hashedPassword,
      phone,
      type,
      legalDocuments,
      status: 'inactive', // Statut par défaut
    });

    // Sauvegardez dans la base de données
    return newClient.save();
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources:{
                db:{
                    url : 'mongodb+srv://addichaneayoub:OfcJZy30iwj7Eqjk@cluster0.mongodb.net/projetCertificatsDb?retryWrites=true&w=majority'
                },

            },
        });

    }
       
    
}

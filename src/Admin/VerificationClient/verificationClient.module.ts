import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema } from 'src/Client/schema/client.schema';
import { VerificationClientService } from './verificationClient.service';
import { VerificationClientController } from './verificationClient.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }])],
    providers: [ VerificationClientService ],
    controllers: [ VerificationClientController],
})
export class VerificationClientModule {}
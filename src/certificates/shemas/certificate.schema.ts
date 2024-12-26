import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CertificateDocument = Certificate & Document;

@Schema()
export class Certificate {
  @Prop({ required: true })
  clientId: string;

  @Prop({ required: true })
  uniqueId: string;

  @Prop({ required: true })
  qrCodeUrl: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: false })
  isCertified: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CertificateSchema = SchemaFactory.createForClass(Certificate);

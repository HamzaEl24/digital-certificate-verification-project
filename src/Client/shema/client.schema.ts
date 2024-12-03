import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

// Schema Docuement
@Schema({ timestamps: true })
export class LegalDocument {
  @Prop({ required: true })
  documentName: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: Date.now })
  uploadedAt: Date;

  @Prop({ default: false })
  validated: boolean;
}

// Schema Subscription
@Schema()
export class Subscription {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;
}

// Schema Client
@Schema({ timestamps: true })
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ enum: ['active', 'inactive'], default: 'inactive' })
  status: string;

  @Prop({required: true })
  type: string;

  @Prop({ type: [LegalDocument], default: [] })
  legalDocuments: LegalDocument[];

  @Prop({ type: [Subscription], default: [] })
  subscriptions: Subscription[];
  @Prop()
  token: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
export const LegalDocumentSchema = SchemaFactory.createForClass(LegalDocument);
export const SubscriptionShema = SchemaFactory.createForClass(Subscription);

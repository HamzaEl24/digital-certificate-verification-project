import { Schema, Document } from 'mongoose';

// Interface TypeScript pour représenter un Client
export interface IClient extends Document {
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  type: string;
  legalDocuments: {
    documentName: string;
    url: string;
    validated: boolean;
    uploadedAt: Date;
  }[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

// Définition du schéma Client
export const ClientSchema = new Schema<IClient>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  legalDocuments: [
    {
      documentName: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      validated: {
        type: Boolean,
        default: false,
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

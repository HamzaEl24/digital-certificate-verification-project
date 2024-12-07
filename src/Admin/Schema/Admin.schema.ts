import { SchemaFactory } from '@nestjs/mongoose';
import { Schema, model, Document } from 'mongoose';
import { AdminAuthModule } from '../AuthAdmin/auth.module';
// Interface TypeScript pour représenter un Admin
export interface IAdmin extends Document {
    name: string;
    email: string;
    passwordHash: string;
    notifications: {
      type: string;
      message: string;
      read: boolean;
      createdAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
  }

// Définition de schéma
export const AdminSchema = new Schema<IAdmin>({
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
  notifications: [
    {
      type: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      read: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});




import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import {Client, ClientDocument } from '../../shema/client.schema';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<ClientDocument>,
    private readonly jwtService: JwtService
  ) {}

  async findClientByEmail(email: string): Promise<Client | null> {
    return this.clientModel.findOne({ email }).exec();
  }

  

  async validateClient(email: string, password: string): Promise<{ isValid: boolean; client?: Client; message?: string }> {
    const client = await this.findClientByEmail(email);
  
    if (!client) {
      return { isValid: false, message: 'Client not found' };
    }
  
    const isPasswordValid = await bcrypt.compare(password, client.password);
    if (!isPasswordValid) {
      return { isValid: false, message: 'Invalid password' };
    }
  
    if (client.status === 'inactive') {
      return { isValid: false, message: 'Client is inactive' };
    }
  
    return { isValid: true, client };
  }
  

  async login(payload: any): Promise<{ token: string}> {
    const token = this.jwtService.sign(payload);
  
    return { token};
  }
  
}

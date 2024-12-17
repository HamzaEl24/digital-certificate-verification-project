import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import {IClient, ClientSchema } from '../../schema/client.schema';




@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Client') private readonly clientModel: Model<IClient>,
    private readonly jwtService: JwtService
  ) {}

  async findClientByEmail(email: string): Promise<IClient | null> {
    return this.clientModel.findOne({ email }).exec();
  }

  

  async validateClient(email: string, password: string): Promise<{ isValid: boolean; client?: IClient; message?: string }> {
    const client = await this.findClientByEmail(email);
  
    if (!client) {
      return { isValid: false, message: 'Client not found' };
    }
  
    const isPasswordValid = await bcrypt.compare(password, client.passwordHash);
    if (!isPasswordValid) {
      return { isValid: false, message: 'Invalid password' };
    }
  
    if (client.status === 'inactive') {
      return { isValid: false, message: 'Client is inactive' };
    }
  
    return { isValid: true, client };
  }
  

  async login(payload: IClient): Promise<{ token: string }> {
    const {_id, email, name } = payload;  // Correct destructuring from the payload
    const token = this.jwtService.sign({
      sub: _id.toString(),  // Convert _id to string if necessary
      email: email,
      name: name,
    });
  
    return { token };
  }
  
}

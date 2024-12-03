import { Controller, Post, Body, Get, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Client } from '../../shema/client.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('loginClient')
  async login(@Body() loginData: any) {
    
    const validation = await this.authService.validateClient(loginData.email, loginData.password);
    
    if (!validation.isValid) {
      throw new BadRequestException(validation.message);
    }

    // Génération et enregistrement du token
    const tokenData = await this.authService.login(validation.client);

    return {
      message: 'Login successful',
      
      token: tokenData.token,
      client: tokenData.client,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}


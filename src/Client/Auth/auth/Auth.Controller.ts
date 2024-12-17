import { Controller, Post, Body, Get, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { IClient } from 'src/Client/schema/client.schema';
import { LoginDto } from './DTO';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('loginClient')
  async login(@Body() loginData: LoginDto) {
    
    const validation = await this.authService.validateClient(loginData.email, loginData.password);
    
    if (!validation.isValid) {
      throw new BadRequestException(validation.message);
    }

    
    const tokenData = await this.authService.login(validation.client);

    return {
      message: 'Login successful',
      token: tokenData.token, 
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}


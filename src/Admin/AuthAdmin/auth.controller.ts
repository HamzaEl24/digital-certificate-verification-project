import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AdminAuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LoginDto} from './dto/login.dto';
import {RegisterDto }from './dto/register.dto';

@Controller('admin')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('loginAdmin')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user; 
  }
}
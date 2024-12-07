import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IAdmin } from '../Schema/Admin.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto} from './dto/register.dto'



@Injectable()
export class AdminAuthService {
  constructor(
    @InjectModel('Admin') private AdminModel: Model<IAdmin>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<IAdmin> {
    const { name, email, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new this.AdminModel({ name, email, passwordHash: hashedPassword });
    return newAdmin.save();
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const admin = await this.AdminModel.findOne({ email });
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: admin._id, email: admin.email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async validateAdmin(adminId: string): Promise<IAdmin> {
    return this.AdminModel.findById(adminId);
  }
}

import { Controller, Post, Body, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RegisterService } from './register.service';
import { Express } from 'express';
import { diskStorage } from 'multer';
  

  @Controller('register')
  export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}
  
    @Post('client')
    @UseInterceptors(
      FilesInterceptor('documents', 2, {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const extension = file.originalname.split('.').pop();
            callback(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
          },
        }),
      }),  )
    async registerClient(
      @Body() data: any,
      @UploadedFiles() files: Express.Multer.File[],
    ) {
      return this.registerService.registerClient(data, files);
    }
  }
  
// src/certificates/certificates.controller.ts
import {
    Controller,
    Post,
    Body,
    UploadedFile,
    UseInterceptors,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { CertificatesService } from './certificates.service';
  import { SubmitListDto } from './dto/submit-list.dto';
  import * as csvParser from 'csv-parser';
  
  @Controller('certificates')
  export class CertificatesController {
    constructor(private readonly certificatesService: CertificatesService) {}
  
    // Option 1 : Saisie manuelle via formulaire
    @Post('submit-list')
    async submitList(@Body() submitListDto: SubmitListDto) {
      return await this.certificatesService.processList(submitListDto.people, submitListDto.issuedBy);
    }
  
    // Option 2 : Upload d'un fichier CSV
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadCsv(@UploadedFile() file: Express.Multer.File) {
      if (!file) {
        throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
      }
  
      const people = [];
      const stream = require('streamifier').createReadStream(file.buffer);
  
      return new Promise((resolve, reject) => {
        stream
          .pipe(csvParser())
          .on('data', (data) => {
            if (data.name && data.email) {
              people.push({ name: data.name, email: data.email });
            }
          })
          .on('end', async () => {
            const result = await this.certificatesService.processList(people, 'SomeOrganization');
            resolve(result);
          })
          .on('error', (error) => reject(error));
      });
    }
  }
  
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as fs from 'fs';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new Logger() });

   // Vérifier si le dossier uploads existe, sinon le créer
   const uploadPath = join(__dirname, '../uploads/documents');
   if (!fs.existsSync(uploadPath)) {
     fs.mkdirSync(uploadPath, { recursive: true });
   }





  await app.listen(3000);
}
bootstrap();

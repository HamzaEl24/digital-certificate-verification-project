import { Controller, Get, Query, HttpException, HttpStatus} from '@nestjs/common'
import { ValidationService } from './validation.service';

@Controller('validation')
export class ValidationController {
    constructor(private readonly ValidationService: ValidationService){}

    @Get()
    async validateCertificate(
        @Query('id') id?: string,
        @Query('qrCode') qrCode?: string,
    ){
       
        if(!id && !qrCode){
            throw new HttpException(
                'You must provide either an ID or QR code',
                HttpStatus.BAD_REQUEST,
            );
        }

        const result = await this.ValidationService.validateCertificate(id, qrCode);

        if(!result) {
            throw new HttpException (
                'Certificate not found or invalid.',
                HttpStatus.NOT_FOUND,
            );
        }
        return result; 
    }
}
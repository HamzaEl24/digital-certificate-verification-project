import { ForbiddenException, Injectable } from "@nestjs/common";
import * as request from 'supertest';
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()

export class AuthService{

    constructor(private prisma: PrismaService){}

async SignUp(dto: AuthDto){

        const password = await argon.hash(dto.password);
try{
        const user = await this.prisma.user.create({
             data: {
                email: dto.email,
                password,
             },
        });
    
        return user;
    } catch(error){
        if(error instanceof PrismaClientKnownRequestError){
            if(error.code === 'P2002'){
                throw new ForbiddenException(
                    'Credentials taken',
                    );
            }
        }
        throw error
    }
    }
async SignIn(dto: AuthDto){

    const user = await this.prisma.user.findUnique({
        where: {
            email: dto.email,
        },
    });
    if(!user)
        throw new ForbiddenException('Credentials incorrect',);

    const pwMatches = await argon.verify(
        user.password,
        dto.password,
    );

    if(!pwMatches)
        throw new ForbiddenException(
         'Credentials incorrect',
        );

    delete user.password;

        return user;
    }
}

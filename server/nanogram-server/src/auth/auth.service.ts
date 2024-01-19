import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError} from '@prisma/client/runtime';
@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService){}
    async signup(dto: AuthDto) {
        const hash_pass=await argon.hash(dto.password);
       const data={
        ...dto,
        password: hash_pass,
       }
    try{
        const user= await this.prisma.user.create({data});
        delete user.password;
        return user;
    }catch(error){
     if(error instanceof PrismaClientKnownRequestError){
        if(error.code==='P2002'){
            throw new ForbiddenException(
            'dados em uso',
            );
        };
     }
   throw error;
    }
       
    }

    signin() {
        return {msg:'signed in'};
    }
}

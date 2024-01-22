import { Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { profile_picDto, usersupdateDto } from './users_dto';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}
    async get(){
        return 'me';
    }
    async getUser(username:string){
        const user= await this.prisma.user.findUnique({
          where:{
              username,
          },
        });
        if(!user){
            throw new NotFoundException("Usuário não encontrado");
        }
        return user;
    }
    async update(dto: usersupdateDto,username: string,image?: profile_picDto,){
      this.getUser(username);
      
      if(dto.password){
           dto.password = await argon.hash(dto.password);
      }  
      if(!image){ 
        return await this.prisma.user.update({
          where: {
              username,
            },
            data: {
              ...dto,
             
            },
          });
        }
        return await this.prisma.user.update({
          where: {
              username,
            },
            data: {
              ...dto,
              profile_picture:image.buffer,
            },
          });
    }
   
}

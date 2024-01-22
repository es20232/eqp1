import { Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { profile_picDto, usersupdateDto } from './users_dto';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}
    async get(id: number){
      try{
        const user= await this.prisma.user.findUnique({
        where:{
            id,
        },

      });
      delete user.password;
      return user;
    }
      catch(error){
        console.error(`Error : ${error.message}`);
        throw new NotFoundException('User not found.');
      }
      
    }
   
    async update(dto: usersupdateDto,id: number,image?: profile_picDto,){
      this.get(id);
     
      if(dto.password){
           dto.password = await argon.hash(dto.password);
      }  
      if(!image){ 
        const user= await this.prisma.user.update({
          where: {
              id,
            },
            data: {
              ...dto,
             
            },
          });
          delete user.password
          return user;
        }
        const user= await this.prisma.user.update({
          where: {
              id,
            },
            data: {
              ...dto,
              profile_picture:image.buffer,
            },
          });
          delete user.password;
          return user;
    }
    async delete(id: number){
       this.get(id);
       const user= await this.prisma.user.delete(
        {
          where:{
            id,
          }
        }
       )
       delete user.password;
       return user;
    }
   
   
}
import { Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { profile_picDto, usersupdateDto,userReturnDto } from './users_dto';
import * as argon from 'argon2';
import { Buffer } from 'buffer';
import { bufferToBase64 } from 'src/images';
import { userInfo } from 'os';

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
      if(user.profile_picture?.buffer.byteLength>0){
        const buffertoconvert = Buffer.from(user.profile_picture.buffer);
        const profile_picture = bufferToBase64(buffertoconvert);
        delete user.profile_picture

        const updatedUser=new userReturnDto()
        updatedUser.id=user.id
        updatedUser.email=user.email
        updatedUser.full_name=user.full_name
        updatedUser.username=user.username
        updatedUser.profile_picture=profile_picture
        return updatedUser;
}
      return user;
    }
      catch(error){
        console.error(`Error : ${error.message}`);
        throw new NotFoundException('User not found.');
      }
      
    }
   
    async update(dto: usersupdateDto,id: number,image?: Express.Multer.File,){
      this.get(id);
     
      if(dto.password){
           dto.password = await argon.hash(dto.password);
      }
      try{  
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
            if(user.profile_picture?.buffer.byteLength>0){
                    const buffertoconvert = Buffer.from(user.profile_picture.buffer);
                    const profile_picture = bufferToBase64(buffertoconvert);
                    delete user.profile_picture

                    const updatedUser=new userReturnDto()
                    updatedUser.id=user.id
                    updatedUser.email=user.email
                    updatedUser.full_name=user.full_name
                    updatedUser.username=user.username
                    updatedUser.profile_picture=profile_picture
                    return updatedUser;
            }
            return user;
          }
        else{
          const user= await this.prisma.user.update({
            where: {
                id,
              },
              data: {
                ...dto,
                profile_picture:image.buffer,
              },
            });
            
            const buffertoconvert = Buffer.from(user.profile_picture.buffer);
            const profile_picture = bufferToBase64(buffertoconvert);
            delete user.password;
            delete user.profile_picture;

            const updatedUser=new userReturnDto()
            updatedUser.id=user.id
            updatedUser.email=user.email
            updatedUser.full_name=user.full_name
            updatedUser.username=user.username
            updatedUser.profile_picture=profile_picture

            return updatedUser;
        }
        
      }catch(error){
        console.error(`Error: ${error.message}`);
        throw error;
      } 
    }
    async delete(id: number){
       this.get(id);
      try{
       const user= await this.prisma.user.delete(
        {
          where:{
            id,
          }
        }
       )
      
       delete user.password;
       return user;
      
      }catch(error){
        console.error(`Error: ${error.message}`);
        throw error;

      }
    }
   
   
}
import { HttpCode, Injectable } from '@nestjs/common';
import { createpostdto, returnpostdto, updatepostdto } from './posts_dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Buffer } from 'buffer';
import { Prisma } from '@prisma/client';
import { bufferToBase64 } from 'src/images';
import { throwError } from 'rxjs';
import { getUserDto } from 'src/users/users_dto';

@Injectable()
export class PostsService {
   
    
 
  
  
  constructor(private prisma: PrismaService){}

  async getPosts(id: number) {
   try{
    const userPosts=await this.prisma.post.findMany({
      where: {
        userId:id, 
       },

    })
    const postsWithBase64Images = userPosts.map(post => ({
      ...post,
      post_image: post.post_image.toString('base64'),
    }));
    return postsWithBase64Images;
  }catch(error){
     throw error;

  }
    
  }

  async create(id: number, dto: createpostdto,image: Express.Multer.File,) {
    const data = {
        userId :id,
        descricao: dto.descricao,
        post_image:image.buffer
    }
    try {
      const post = await this.prisma.post.create( { data});

      const buffertoconvert = Buffer.from(post.post_image.buffer);
      const image = bufferToBase64(buffertoconvert);

      const createdpost=new returnpostdto()
      createdpost.id=post.id;
      createdpost.Userid=post.userId;
      createdpost.descricao=post.descricao;
      createdpost.publication_date=post.publication_date;
      createdpost.postimage= image;
      return createdpost;
  } catch (error) {
      throw error;
  }
       
}
async edit(id: number,postid:number ,dto: updatepostdto) {
  try{
    const upost= await this.prisma.post.update(
      {
        where: {
           userId: id,
           id:postid, 
          },
          data: {
            descricao:dto.descricao,
          
          },
        }
    )
    const buffertoconvert = Buffer.from(upost.post_image.buffer);
    const image = bufferToBase64(buffertoconvert);

    const updatedpost=new returnpostdto()
    updatedpost.id=upost.id;
    updatedpost.Userid=upost.userId;
    updatedpost.descricao=upost.descricao;
    updatedpost.publication_date=upost.publication_date;
    updatedpost.postimage= image;
    return updatedpost;
      }catch(error){
        throw error

      }
}
async delete(id: number, postid: number ) {
  try{
    const dpost= await this.prisma.post.delete(
      {
        where: {
           userId: id,
           id:postid,
          },
        }
    
    )
    return HttpCode(204);
      }catch(error){
        throw error
      }
}

async feed() {
  try{
    const postsWithUserData = await this.prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profile_picture:true,
            
          }
        }
      }
    });
    const postsUsersWithBase64Images = postsWithUserData.map(userPost => ({
      user: {
        id:userPost.user.id,
        username: userPost.user.username,
        profile_picture: userPost.user.profile_picture.toString('base64')
      },
      post: {
          id: userPost.id,
          publication_date: userPost.publication_date,
          descricao: userPost.descricao,
          userId: userPost.userId,
          post_image: userPost.post_image.toString('base64')
      } 
    }));
    return postsUsersWithBase64Images;
  }catch(error){
     throw error;

  }
  
}
async getuserPosts(id: number) {
  try{
    const userPosts=await this.prisma.post.findMany({
      where: {
        userId:id, 
       },

    })
    const user=await this.prisma.user.findUnique({
      where:{
        id,
      },select:{
        username:true,
        profile_picture:true,
      }
    })
    const postsWithBase64Images = userPosts.map(post => ({
      ...post,
      post_image: post.post_image.toString('base64'),
    }));

    const getUser=new getUserDto();
    getUser.username=user.username

    if (user.profile_picture?.buffer.byteLength > 0) {
                    
      const buffertoconvert = Buffer.from(user.profile_picture.buffer);
      const profile_picture = bufferToBase64(buffertoconvert);
      getUser.profile_picture=profile_picture;
      return{
        getUser,
        postsWithBase64Images
      } 
    }
    getUser.profile_picture='';
    return {
      username:getUser.username,
      profile_picture:getUser.profile_picture,
      postsWithBase64Images
    };
  }catch(error){
     throw error;

  }
}
}

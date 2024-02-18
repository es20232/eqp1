import { Injectable } from '@nestjs/common';
import { createpostdto, returnpostdto } from './posts_dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Buffer } from 'buffer';
import { Prisma } from '@prisma/client';
import { bufferToBase64 } from 'src/images';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService){}
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
 
}

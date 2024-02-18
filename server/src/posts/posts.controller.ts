import { Body, Controller, ParseFilePipeBuilder, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { createpostdto } from './posts_dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileTypeValidationPipe } from 'src/images/filevalidation.pipe';
const  MAX_FILESIZE=5242000;
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {
    
  }
    @UseGuards(AuthGuard('jwt'))
    @Post('create-post')
    @UseInterceptors(FileInterceptor('postimage'))
    createPost(@GetUser('id') id: number,@UploadedFile(new FileTypeValidationPipe(),
    
    new ParseFilePipeBuilder()
    .addMaxSizeValidator({
      maxSize: MAX_FILESIZE
    })
    .build({
      fileIsRequired: true 
    }),
    
    
    )image: Express.Multer.File,@Body() dto:createpostdto) {
        return this.postsService.create(id,dto,image);
    }

  
}



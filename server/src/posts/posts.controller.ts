import { Body, Controller, Delete, Get, HttpCode, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { createpostdto, updatepostdto } from './posts_dto';
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

  @UseGuards(AuthGuard('jwt'))
  @Put(':postid')
    editPost(@GetUser('id') id:number,@Body() dto:updatepostdto,@Param('postid',ParseIntPipe) postid:number){
          return this.postsService.edit(id,postid,dto);
    } 

    
   @UseGuards(AuthGuard('jwt'))
   @Delete(':postid')
   @HttpCode(204)
    deletePost(@GetUser('id') id:number,@Param('postid',ParseIntPipe) postid:number){
          return this.postsService.delete(id,postid);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('user-posts')
     userPost(@GetUser('id') id: number,){
           return this.postsService.getPosts(id);
          
     } 

    @UseGuards(AuthGuard('jwt'))
    @Get('feed')
     allPost(){
           return this.postsService.feed();
     } 
  
  
}



import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail,IsNotEmpty,IsOptional,IsString } from "class-validator";

export class usersupdateDto {
    @ApiPropertyOptional({
        description:'Novo nome a ser inserido como nome completo do usuário',
        example:'Alexandre Grande Moraes',
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    full_name: string;
    @ApiPropertyOptional({
        description:'Novo Username a ser utilizado na aplicação',
        example:'Xands',
    })
   @IsOptional() 
   @IsString()
   @IsNotEmpty()
    username: string;
    @ApiPropertyOptional({
        description:'Novo e-mail a ser associado a conta do usuário',
        example:'Xand2@gmail.com',
    })
   @IsOptional()
   @IsEmail()
   @IsNotEmpty()
    email: string;
    @ApiPropertyOptional({
        description:'Nova senha de usuário a ser associada a conta',
        example:'Xand0703',
    })
   @IsOptional()
   @IsString()
   @IsNotEmpty()
    password: string;
  

    
}
export class profile_picDto{
    @IsOptional()
    @IsNotEmpty()
    buffer: Buffer;
    @ApiPropertyOptional({
        description:'Arquivo de imagem para atualizar foto de perfil do usuário',
        example:'myphoto.png/jpg/jpeg',
    })
    @IsOptional()
    @IsNotEmpty()
    profile_picture: Express.Multer.File;
}
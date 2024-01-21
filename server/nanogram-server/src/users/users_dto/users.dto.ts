import { IsEmail,IsNotEmpty,IsOptional,IsString } from "class-validator";

export class usersupdateDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    full_name: string;
   @IsOptional() 
   @IsString()
   @IsNotEmpty()
    username: string;
   @IsOptional()
   @IsEmail()
   @IsNotEmpty()
    email: string;
   @IsOptional()
   @IsString()
   @IsNotEmpty()
    password: string;
  

    
}
export class profile_picDto{
    fieldname:string;
    buffer: Buffer;
    @IsOptional()
    profile_picture: Express.Multer.File;
}
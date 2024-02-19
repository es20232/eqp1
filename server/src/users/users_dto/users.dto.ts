import { BadRequestException } from "@nestjs/common";
import { ApiProperty, } from "@nestjs/swagger";
import { IsEmail,IsNumber,IsOptional,IsString, Length, ValidationError, validate } from "class-validator";

export class ValidateDto {
    static async sanitizeAndValidate(data: any,image:Express.Multer.File): Promise<usersupdateDto> {
        // Remover campos vazios        
        const sanitizedData = Object.entries(data)
          .filter(([_, value]) => value !== "")
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
        
        
        const dto = new usersupdateDto();
        Object.assign(dto, sanitizedData);
        //validacao de preenchimento de campos
        const allFieldsEmpty = Object.keys(sanitizedData).every((key) => !sanitizedData[key]);
        if(allFieldsEmpty && (image===null || image===undefined)){
            console.error("No change data was provided for any field")
            throw new BadRequestException(
                "No change data was provided for any field"
              );
             
        }
        //validacao de valor dos campos
        const validationErrors = await validate(dto);
        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map(
                (validationError: ValidationError) => {
                    const constraint = Object.values(validationError.constraints)[0];
                    return `${constraint}`;
                }
            );
            console.error(errorMessages);
            throw new BadRequestException({
              message: errorMessages,
              statusCode: 400,
            });
          }
    
       
        return dto;
      }
}

export class usersupdateDto {
    @ApiProperty({
        description:'Novo nome a ser inserido como nome completo do usuário',
      //  example:'Alexandre Grande Moraes',
    })
    @IsOptional()
    @IsString()
    full_name: string;
    @ApiProperty({
        description:'Novo Username a ser utilizado na aplicação',
       
    })
   @IsOptional() 
   @IsString()
    username: string;
    @ApiProperty({
        description:'Novo e-mail a ser associado a conta do usuário',
       
    })
   @IsOptional()
   @IsEmail({}, { message: 'e-mail field must be filled in with a valid e-mail' })
   email: string;
    @ApiProperty({
        description:'Nova senha de usuário a ser associada a conta',
    })
   @IsOptional()
   @IsString()
   @Length(6, 10, { message:'Password must be at least 6 characters long'})
    password: string;
      
}
export class userReturnDto {
    @IsOptional()
    @IsNumber()
    id: number;


    @IsOptional()
    @IsString()
    full_name: string;
   
   @IsOptional() 
   @IsString()
    username: string;
   
   @IsOptional()
   @IsEmail({}, { message: 'e-mail field must be filled in with a valid e-mail' })
   email: string;
   
  
   @IsOptional()
   @IsString()
    profile_picture:string;
      
}

export class getUserDto {
   @IsString()
    username: string;
  
   @IsString()
    profile_picture:string;
      
}

export class userImagemDto {
   
   @IsOptional() 
   @IsString()
    username: string;
     
   @IsOptional()
   @IsString()
    profile_picture:string;
      
}

export class profile_picDto {
    
    @IsOptional()
    Profile_picture: Express.Multer.File;
}

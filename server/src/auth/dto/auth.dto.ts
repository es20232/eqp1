import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumberString, IsString } from "class-validator";


export class UserDto {
    @ApiProperty({
        description:'nome completo do usuário necessário para compor dados no cadastro,informação exibida no perfil de usuário',
        example:'Alexandre Grand',
    })
    @IsString()
    @IsNotEmpty()
    full_name: string;

     @ApiProperty({
        description:'O username é o apelido necessário utilizado na aplicação, esta informação é exibida no perfil de usuário',
        example:'XandGrand',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

     @ApiProperty({
        description:'O e-mail é necessário na aplicação aplicação para login e recuperação de senha pelo usuário, esta informação é exibida no perfil de usuário',
        example:'Xandgrand@gmail.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

      @ApiProperty({
        description:'A senha cadastrada pelo usuário podendo ser utilizada para se conectar a sua conta na aplicação, informação editável no perfil do usuário, mas não visualizável devido a políticas de segurança da aplicação',
        example:' Xand1234',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class AuthDto {
    @ApiProperty({
        description:'username previamente cadastrado na aplicação pelo usuário',
        example:'XandGrand',
    })
    @IsString()
    @IsNotEmpty()
    username: string;
    @ApiProperty({
        description:'senha fornecida pelo usuário',
        example:' Xand1234',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class ResetPasswordDto {
    @ApiProperty({
        description:'e-mail fornecido pelo usuário para recuperação de senha',
        example:'Xandgrand@gmail.com',
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}

export class ResetCodeDto {
    @ApiProperty({
        description:'Código de 6 digítos enviado pela aplicação ao e-mail fornecido',
        example:'123456',
    })
    @IsNotEmpty()
    @IsString()
    code: string;
}

export class NewPasswordDto {
    @ApiProperty({
        description:'nova senha a ser associada a conta do usuário',
        example:'xandin12',
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}
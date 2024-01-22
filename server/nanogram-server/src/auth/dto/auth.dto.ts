import { IsEmail, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class UserDto {
    @IsString()
    @IsNotEmpty()
    full_name: string;


    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}

export class ResetCodeDto {
    @IsNotEmpty()
    @IsString()
    code: string;
}

export class NewPasswordDto {
    @IsNotEmpty()
    @IsString()
    password: string;
}
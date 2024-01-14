import { IsAlpha, IsEmail, IsNotEmpty, IsNumber, IsString, IsUUID, Length } from "class-validator";

export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    @Length(3,18)
    @IsAlpha()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    @Length(3,18)
    @IsAlpha()
    last_name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;


    @IsNotEmpty()
    @Length(8)
    pass: string;
}
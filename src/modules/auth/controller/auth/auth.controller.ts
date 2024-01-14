import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import { AuthService } from 'src/services/auth/auth.service';
import {AuthGuard} from 'src/modules/auth/auth/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}

    @Post('login')
    @UsePipes(new ValidationPipe())
    async authuser(@Body() reqBody: LoginDto ){

        const responseObject: any = await this.authService.login(reqBody);
        if(responseObject){

            const token = await this.authService.signtoken(reqBody.email);
            return token;
        }
    }

    @Get('allusers')
    @UseGuards(AuthGuard)
    async getallusers(@Request() req){
        const email = req.user.email;
        const isUser = await this.authService.getuserdetails(email);
        if(isUser){
            return isUser;
        }
        
    }
}

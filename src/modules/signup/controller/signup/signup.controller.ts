import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/creatuser.dto';
import { SignupService } from 'src/services/signup/signup.service';

@Controller('signup')
export class SignupController {
    constructor(private signinService: SignupService) { }

    @Post('createuser')
    @UsePipes(new ValidationPipe())
    async createnewuser(@Body() reqbody: CreateUserDto) {
        //check if user exists
        const isExist: string = await this.signinService.findoneuser(reqbody.email);
    
        if (isExist == 'user does not exist') {
            const isUserCreated: string = await  this.signinService.createUser(reqbody);
            if (isUserCreated == 'user created') {
                return { msg: 'new user created successfully' }
            }
        }

    }

    @Get('getallusers')
    getallusers() {
        return this.signinService.getallusers();
    }
}

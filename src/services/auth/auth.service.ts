import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { LoginDto } from 'src/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';




@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService:JwtService
    ) { }

    //authenticate user service function
    async login(reqbody:LoginDto){
        const user = await this.userModel.findOne({"email":reqbody.email});
        if(user && (await bcrypt.compare(reqbody.pass,user.pass))){
            const {pass, ...result} = user;
            return result;
        }else throw new HttpException('invalid user details', HttpStatus.BAD_REQUEST)

    }

    //sign jwt token
    async signtoken(email:string): Promise<{token:string}>{

        const payload = {email:email}
        return {token: this.jwtService.sign(payload)}

    }

    async getuserdetails(email:string){
        try{
            const userdatails = await this.userModel.findOne({"email":email});
        if(userdatails){
            return userdatails;
        }else{
            throw new HttpException('No user found',HttpStatus.BAD_REQUEST);
        }
        }catch(err){
            throw new HttpException(err,HttpStatus.BAD_REQUEST)
        }
        
    }



}

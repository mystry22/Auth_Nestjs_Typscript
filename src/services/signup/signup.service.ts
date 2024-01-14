import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/creatuser.dto';
import { User } from 'src/schemas/User.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignupService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    //find one user service
    async findoneuser(email: string) {
        const isExist = await this.userModel.findOne({ "email": email })
        if (isExist) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        } else return 'user does not exist'
    }

    //get all user service
    async getallusers() {
        return await this.userModel.find();
    }

    //Create new user service
    async createUser(reqBody: CreateUserDto) {
        try {
            //hash password 
            const hashedPass = await this.encryptPassword(reqBody.pass);
            const newUser = new this.userModel(reqBody);
            await newUser.save();

            //update hashed password
            const isUpdated = await this.updateUser(reqBody.email,hashedPass);
            if (isUpdated == 'password updated') {
                return 'user created'
            }
        }
        catch (error) {
            console.log(error)
            throw new HttpException('Unable to create user', HttpStatus.BAD_REQUEST);
        }

    }

    //hash password function
    async encryptPassword(pass:string) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);
        return hashedPassword;
    }

    //update password function
    async updateUser(email:string,hashedPass:string){
       const isUpdated = await this.userModel.updateOne({email : email}, {$set : {pass: hashedPass}})
       if(isUpdated){
        return 'password updated'
       }
    }

    
}

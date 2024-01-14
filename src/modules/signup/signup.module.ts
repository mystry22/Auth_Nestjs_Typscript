import { Module } from '@nestjs/common';
import { SignupController } from './controller/signup/signup.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/User.schema';
import {SignupService} from 'src/services/signup/signup.service';

@Module({
    controllers: [SignupController],
    imports: [MongooseModule.forFeature([{
        name: User.name ,
        schema: userSchema
    }])],
    providers: [SignupService]
})
export class SignupModule {}

import { Module,MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from 'src/services/auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/User.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';


@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        MongooseModule.forFeature([{
            name: User.name,
            schema: userSchema
        }]),
        ConfigModule.forRoot(),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions:{
                expiresIn:process.env.JWT_EXPIRES
            }
        })

    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { 
    configure(consumer :MiddlewareConsumer){
        consumer.apply(AuthMiddleware).forRoutes(
            {
                path: 'auth/allusers',
                method: RequestMethod.GET
            }
        )
    }
}

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { LoginDto } from "src/dto/login.dto";
import { AuthService } from "src/services/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super()
    }

    async validate(reqBody:LoginDto){
        const user: any = await this.authService.login(reqBody);
        if(!user){
            throw new UnauthorizedException();
        }else{
            return user;
        }
    }
}
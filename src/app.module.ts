import { Module } from '@nestjs/common';
import { SignupModule } from './modules/signup/signup.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    SignupModule,
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://mystry:mystry22@fancyfinery.k3uod.mongodb.net/authnestjs?retryWrites=true&w=majority'),
  ],
  
})
export class AppModule {}

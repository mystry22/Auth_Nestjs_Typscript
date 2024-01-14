import { Module } from '@nestjs/common';
import { SignupModule } from './modules/signup/signup.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    SignupModule,
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
  ],
  
})
export class AppModule {}

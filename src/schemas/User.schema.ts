import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User{

    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop({unique: true})
    email: string;

    @Prop()
    pass: string;
}

export const userSchema = SchemaFactory.createForClass(User);
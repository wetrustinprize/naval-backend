import { IsEmail, Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class CreateUserArguments {
    @Field()
    @Length(6, 24)
      username!: string;

    @Field()
    @IsEmail()
      email!: string;

    @Field()
      password!: string;
}

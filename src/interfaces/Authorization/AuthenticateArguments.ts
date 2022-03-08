import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class AuthenticateArguments {
    @Field()
      username!: string;

    @Field()
      password!: string;
}

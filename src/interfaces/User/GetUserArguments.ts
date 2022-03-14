import { ArgsType, Field } from "type-graphql";

@ArgsType()
export default class GetUserArguments {
    @Field()
    username?: string;
    
    @Field()
    id?: string;
}
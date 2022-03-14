import { ArgsType, Field } from "type-graphql";

@ArgsType()
export default class DeleteUserArguments {
  @Field()
  username?: string;

  @Field()
  id?: string;
}

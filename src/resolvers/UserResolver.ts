import { User } from '@generated/type-graphql';
import CreateUserArguments from '@interfaces/User/CreateUserArguments';
import UserService from '@services/UserService';
import {
  Args, Mutation, Resolver,
} from 'type-graphql';

@Resolver()
export default class UserResolver {
    @Mutation(() => User, { description: 'Creates a new user' })
  async createUser(
        @Args() input: CreateUserArguments,
  ): Promise<User> {
    const user = await UserService.create(input);

    return user;
  }
}

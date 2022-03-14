import { User } from '@generated/type-graphql';
import CreateUserArguments from '@interfaces/User/CreateUserArguments';
import DeleteUserArguments from '@interfaces/User/DeleteUserArguments';
import UserService from '@services/UserService';
import { NavalRoles } from 'src/graphql/NavalAuthChecker';
import { NavalContext } from 'src/graphql/NavalContext';
import {
  Args, Authorized, Ctx, Mutation, Resolver,
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

  @Authorized<NavalRoles>('ADMIN')
  @Mutation(() => Boolean, { description: 'Deletes a user' })
  async deleteUser(
    @Args() input: DeleteUserArguments,
  ): Promise<boolean> {
    await UserService.delete(input);

    return true;
  }

  // TODO: Make additional step to delete all the user's data, like a email confirmation
  @Authorized<NavalRoles>('USER')
  @Mutation(() => Boolean, { description: 'Deletes the logged user' })
    async deleteMyAccount(@Ctx() ctx: NavalContext): Promise<boolean> {
      await UserService.delete({
        id: ctx.userId,
      });

      return true;
    }
}

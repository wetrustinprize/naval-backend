import AuthenticateArguments from '@interfaces/Authorization/AuthenticateArguments';
import AuthenticationService from '@services/AuthenticationService';
import { Args, Query, Resolver } from 'type-graphql';

@Resolver()
export default class AuthenticationResolver {
    @Query(() => String, { description: 'Generates a JWT for authentication' })
  async authenticate(
        @Args() input: AuthenticateArguments,
  ): Promise<string> {
    const token = await AuthenticationService.authenticate(input);

    return token;
  }
}

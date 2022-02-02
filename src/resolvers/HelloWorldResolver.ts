import { Query, Resolver } from 'type-graphql';

@Resolver()
export default class HelloWorldResolver {
  private message: string = 'Hello world!';

    @Query(() => String)
  async helloWorld(): Promise<string> {
    return this.message;
  }
}

import { User } from '@generated/type-graphql';
import CreateUserArguments from '@interfaces/User/CreateUserArguments';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

export default class UserService {
  private prismaClient = new PrismaClient();

  /**
   * Creates a new user
   * @param createUserArguments The information of the new user
   * @returns The user object
   */
  async create(createUserArguments: CreateUserArguments): Promise<User> {
    const password = await bcrypt.hash(createUserArguments.password, await bcrypt.genSalt());

    if (await this.prismaClient.user.findFirst({
      where: {
        username: createUserArguments.username,
      },
    })) {
      throw new Error('username already taken');
    }

    if (await this.prismaClient.user.findFirst({
      where: {
        email: createUserArguments.email,
      },
    })) {
      throw new Error('email already in use');
    }

    const user = await this.prismaClient.user.create({
      data: { ...createUserArguments, password },
    });

    return user;
  }
}

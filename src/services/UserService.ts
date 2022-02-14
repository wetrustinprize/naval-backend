import { User } from '@generated/type-graphql';
import CreateUserArguments from '@interfaces/User/CreateUserArguments';
import prismaClient from '@utils/prisma';
import bcrypt from 'bcryptjs';

export default class UserService {
  /**
   * Creates a new user
   * @param createUserArguments The information of the new user
   * @returns The user object
   */
  static async create(createUserArguments: CreateUserArguments): Promise<User> {
    const password = await bcrypt.hash(createUserArguments.password, await bcrypt.genSalt());

    // Check if username is already taken
    if (await prismaClient.user.findFirst({
      where: {
        username: createUserArguments.username,
      },
    })) {
      throw new Error('username already taken');
    }

    // Check if any user has this e-mail registered
    if (await prismaClient.user.findFirst({
      where: {
        email: createUserArguments.email,
      },
    })) {
      throw new Error('email already in use');
    }

    // Creates the new user
    const user = await prismaClient.user.create({
      data: { ...createUserArguments, password },
    });

    return user;
  }
}

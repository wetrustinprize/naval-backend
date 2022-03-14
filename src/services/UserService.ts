import { User } from '@generated/type-graphql';
import CreateUserArguments from '@interfaces/User/CreateUserArguments';
import DeleteUserArguments from '@interfaces/User/DeleteUserArguments';
import GetUserArguments from '@interfaces/User/GetUserArguments';
import prismaClient from '@utils/prisma';
import bcrypt from 'bcryptjs';

export default class UserService {
  /**
   * Creates a new user
   * @param createUserArguments The information of the new user
   * @returns The user object
   * @throws Error if the username is already taken
   * @throws Error if the email is already taken
   * @throws Error if the password is not strong enough
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

  /**
   * Gets a user
   * @param getUserArguments The information of the user
   * @returns The user object
   * @throws Error if the user is not found
   */
  static async get(getUserArguments: GetUserArguments): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        OR: [
          { username: getUserArguments.username },
          { id: getUserArguments.id },
        ]
      },
    });

    if (!user) {
      throw new Error('user not found');
    }

    return user;
  }

  /**
   * Deletes a user
   * @param deleteUserArguments The information of the user to delete
   * @returns True if the user was deleted
   * @throws Error if the user doesn't exist
   */
  static async delete(deleteUserArguments: DeleteUserArguments): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        OR: [
          { username: deleteUserArguments.username },
          { id: deleteUserArguments.id },
        ],
      },
    });

    if (!user) {
      throw new Error('user not found');
    }

    const result = await prismaClient.user.delete({
      where: {
        id: user.id,
      },
    });

    return result;
  }
}

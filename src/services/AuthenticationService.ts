import AuthenticateArguments from '@interfaces/Authorization/AuthenticateArguments';
import prismaClient from '@utils/prisma';
import bcryptjs from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export default class AuthenticationService {
  /**
   * Generates a new JWT token for the informed username, check the password to authenticate
   * @param authenticateArguments Arguments to generate a new jwt
   * @returns jwt with the access to the informed username
   */
  static async authenticate(authenticateArguments: AuthenticateArguments): Promise<string> {
    const user = await prismaClient.user.findFirst({
      where: {
        username: authenticateArguments.username,
      },
    });

    if (!user) { throw new Error('user not found'); }

    if (!await bcryptjs.compare(authenticateArguments.password, user.password)) { throw new Error('invalid password'); }

    const token = sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: '3d',
      },
    );

    return token;
  }
}

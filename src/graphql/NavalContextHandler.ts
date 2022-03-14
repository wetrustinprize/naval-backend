import { NavalContext } from 'src/graphql/NavalContext';
import { ContextFunction } from 'apollo-server-core';
import { JsonWebTokenError, verify } from 'jsonwebtoken';
import { UserRole } from '@generated/type-graphql';
import UserService from '@services/UserService';

const NavalContextHandler: ContextFunction = async ({ req }) => {
  let userId: string | undefined = undefined;
  let userRole: UserRole | undefined = undefined;

  try {
    const token = verify(req.headers.authorization || '', process.env.JWT_SECRET as string) as any;

    userId = token.userId;

    const user = await UserService.get({id: userId});

    userRole = user.role as UserRole;
  } catch (e) {
    if (!(e instanceof JsonWebTokenError)) {
      throw e;
    }
  }

  return {
    userId,
  } as NavalContext;
};

export default NavalContextHandler;

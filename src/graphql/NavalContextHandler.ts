import { NavalContext } from 'src/graphql/NavalContext';
import { ContextFunction } from 'apollo-server-core';
import { JsonWebTokenError, verify } from 'jsonwebtoken';

const NavalContextHandler: ContextFunction = ({ req }) => {
  let userId;

  try {
    const token = verify(req.headers.authorization || '', process.env.JWT_SECRET as string) as any;

    userId = token.userId;
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

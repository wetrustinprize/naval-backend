import { UserRole } from '@generated/type-graphql';
import { NavalContext } from 'src/graphql/NavalContext';
import { AuthChecker } from 'type-graphql';

type NavalRoles = 'USER' | 'ADMIN';

const NavalAuthChecker: AuthChecker<NavalContext, UserRole> = ({ context }, roles) => {
  if (!context.userId) {
    return false;
  }

  for (const role in roles) {
    switch (role) {
      case 'USER':
        return context.userId !== null;
      case 'ADMIN':
        return context.userId !== null && context.userRole === 'ADMIN';
      default:
        break;
    }
  }

  return false;
};

export default NavalAuthChecker;
export { NavalRoles };

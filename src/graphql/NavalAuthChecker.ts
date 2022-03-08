import { NavalContext } from '@interfaces/NavalContext';
import { AuthChecker } from 'type-graphql';

type NavalRoles = 'USER';

const NavalAuthChecker: AuthChecker<NavalContext, NavalRoles> = ({ context }) => {
  if (!context.userId) {
    return false;
  }

  return true;
};

export default NavalAuthChecker;
export { NavalRoles };

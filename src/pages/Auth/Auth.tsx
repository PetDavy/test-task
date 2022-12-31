import { CenteredLayout, Register, Login } from '~/components';
import { AuthTypes } from './types';

interface AuthProps {
  authType: AuthTypes;
}

export const Auth = ({ authType }: AuthProps) => {
  return (
    <CenteredLayout>
      {authType === AuthTypes.LOGIN && <Login />}
      {authType === AuthTypes.REGISTER && <Register />}
      {authType === AuthTypes.RESET && <h2>Reset</h2>}
    </CenteredLayout>
  );
};

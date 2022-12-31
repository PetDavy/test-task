import { CenteredLayout, Register, Login, Reset } from '~/components';
import { AuthTypes } from './types';

interface AuthProps {
  authType: AuthTypes;
}

export const Auth = ({ authType }: AuthProps) => {
  return (
    <CenteredLayout>
      {authType === AuthTypes.LOGIN && <Login />}
      {authType === AuthTypes.REGISTER && <Register />}
      {authType === AuthTypes.RESET && <Reset />}
    </CenteredLayout>
  );
};

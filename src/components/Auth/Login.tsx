import { Link, useNavigate } from '@tanstack/react-location';
import { useState, FormEvent } from 'react';
import { login } from '~/api';
import { FormGroup } from './FormGroup';
import { ErrorField, isPrintableError } from './types';
import './Auth.scss';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorFields, setErrorFields] = useState<ErrorField[]>([]);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const [user] = await login({ email, password });

      if (user.id) {
        localStorage.setItem('userId', String(user.id));
        setEmail('');
        setPassword('');
        setErrorMessage('');

        navigate({ to: '/anotations' });
      } else {
        setErrorFields([
          { field: 'email', message: 'Email is not valid' },
          { field: 'password', message: 'Wrong password' },
        ]);
      }
    } catch (error) {
      isPrintableError(error) && setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Log in</h2>
        <div className="auth__sub-title">
          Don’t have an account?
          <Link to="/auth/register" className="auth__link">
            Sign up
          </Link>
        </div>
        {errorMessage && <div className="auth__error">{errorMessage}</div>}
        <form className="auth__form" onSubmit={handleSubmit}>
          <FormGroup
            value={email}
            setValue={setEmail}
            type="email"
            label="email"
            error={errorFields.find((field) => field.field === 'email')}
          />
          <FormGroup
            value={password}
            setValue={setPassword}
            type="password"
            label="password"
            error={errorFields.find((field) => field.field === 'password')}
          />
          <button type="submit" className="auth__form-btn">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

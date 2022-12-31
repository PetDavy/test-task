import { Link, useNavigate } from '@tanstack/react-location';
import { useState, FormEvent } from 'react';
import { createUser } from '~/api';
import { FormGroup } from './FormGroup';
import { isPrintableError } from './types';
import './Auth.scss';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await createUser({ name, email, password });
      localStorage.setItem('userId', String(user.id));
      setName('');
      setEmail('');
      setPassword('');
      setErrorMessage('');

      navigate({ to: '/anotations' });
    } catch (error) {
      isPrintableError(error) && setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Sign Up</h2>
        <div className="auth__sub-title">
          Already have an account?
          <Link to="/auth/login" className="auth__link">
            Log in
          </Link>
        </div>
        {errorMessage && <div className="auth__error">{errorMessage}</div>}
        <form className="auth__form" onSubmit={handleSubmit}>
          <FormGroup value={name} setValue={setName} label="Name" />
          <FormGroup value={email} setValue={setEmail} type="email" label="Email" />
          <FormGroup value={password} setValue={setPassword} type="password" label="Password" />
          <button type="submit" className="auth__form-btn">
            Continue
          </button>
        </form>
        <p className="auth__info">
          By signing up, you agree to our <span className="auth__link">Terms of Use</span>and
          <span className="auth__link">Privacy Policy.</span>
        </p>
      </div>
    </div>
  );
};

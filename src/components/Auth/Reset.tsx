import { Link } from '@tanstack/react-location';
import { useState, FormEvent } from 'react';
import { FormGroup } from './FormGroup';
import './Auth.scss';

export const Reset = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Not implemented yet (╯°□°）╯︵ ┻━┻');
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Reset password</h2>
        <div className="auth__sub-title">
          Enter your email address and we&apos;ll send you a link to reset password.
        </div>
        <form className="auth__form" onSubmit={handleSubmit}>
          <FormGroup value={email} type="email" setValue={setEmail} label="email" />
          <button type="submit" className="auth__form-btn">
            Send reset link
          </button>
        </form>
        <p className="auth__info">
          <Link to="/auth/login" className="auth__link">
            Back to Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

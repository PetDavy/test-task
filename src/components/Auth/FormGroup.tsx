import clsx from 'clsx';
import { useState } from 'react';
import EyeCrossIcon from '~/assets/icons/eye-cross.svg';
import EyeIcon from '~/assets/icons/eye.svg';
import { ErrorField } from './types';

interface FormInputProps {
  value: string;
  setValue: (value: string) => void;
  type?: 'text' | 'email' | 'password';
  label: string;
  error?: ErrorField;
}

export const FormGroup = ({ value, setValue, type = 'text', label, error }: FormInputProps) => {
  const [inputType, setInputType] = useState(type);

  const openPassword = () => {
    if (inputType === 'password') {
      setInputType('text');

      setTimeout(() => {
        setInputType('password');
      }, 8000);
    } else {
      setInputType('password');
    }
  };

  return (
    <div className="form-group">
      <input
        type={inputType}
        className={clsx('form-group__input', error && 'form-group__input--error')}
        placeholder={label}
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <div className="form-group__error">{error.message}</div>}
      {type === 'password' && (
        <img
          src={inputType === 'password' ? EyeIcon : EyeCrossIcon}
          alt="eye"
          className="form-group__input-icon"
          width="24"
          height="24"
          onClick={openPassword}
        />
      )}
    </div>
  );
};

import clsx from 'clsx';
import { useState } from 'react';
import EyeCrossIcon from '~/assets/icons/eye-cross.svg';
import EyeIcon from '~/assets/icons/eye.svg';
import { ErrorField } from './types';

interface CheckBoxProps {
  value: boolean;
  label: string;
  setValue: (value: boolean) => void;
}

export const CheckBox = ({ value, label, setValue }: CheckBoxProps) => {
  return (
    <div className="form-group form-group--checkbox">
      <label className="form-group__label">
        <input
          type="checkbox"
          className="form-group__checkbox"
          checked={value}
          onChange={() => setValue(!value)}
        />
        {label}
      </label>
    </div>
  );
};

import clsx from 'clsx';
import { useState } from 'react';
import { CenteredLayout } from '~/components';
import { ButtonType, SelectedButtonType } from './types';

const buttons: ButtonType[] = Object.values(ButtonType);

interface ButtonProps {
  button: ButtonType;
  selectedButton: SelectedButtonType;
  setSelectedButton: (value: ButtonType) => void;
}

const Button = ({ button, selectedButton, setSelectedButton }: ButtonProps) => {
  const style = button === selectedButton;
  return (
    <button
      key={button}
      onClick={() => setSelectedButton(button)}
      className={clsx(
        'h-10 px-5 flex items-center justify-center rounded transition-colors',
        style ? 'bg-green-400' : 'bg-gray-300',
      )}
    >
      {button}
    </button>
  );
};

export const OptionButtons = () => {
  const [selectedButton, setSelectedButton] = useState<SelectedButtonType>(null);
  return (
    <CenteredLayout className="gap-4">
      <div className="text-3xl">See the code</div>
      <div className="grid grid-cols-3 gap-2 w-60">
        {buttons.map((button) => (
          <Button
            key={button}
            button={button}
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
          />
        ))}
      </div>
    </CenteredLayout>
  );
};

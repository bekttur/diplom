import { Button } from '@radix-ui/themes';
import React from 'react';


interface ButtonProps {
  title: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
}

const ButtonUI: React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
> = React.forwardRef(({ title, type, onClick }, ref) => {
  return (
    <Button
      ref={ref}
      size='3'
      style={{ cursor: 'pointer' }}
      color='amber'
      type={type}
      onClick={onClick}
    >
      <span className='text-white dark:text-black'>{title}</span>
    </Button>
  );
});

export default ButtonUI;

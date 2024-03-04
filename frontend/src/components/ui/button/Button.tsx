import React from 'react';
import { Button } from '@radix-ui/themes'

interface ButtonProps {
  title: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
}

const ButtonUI: React.FC<ButtonProps> = ({ title, type, onClick }) => {
  return (
    <Button size='3' style={{cursor: 'pointer'}} color='amber' type={type} onClick={onClick}>
       <span className='text-white dark:text-black'>{title}</span>
    </Button>
  );
};

export default ButtonUI;

import React from 'react';
import { button, ButtonVariants } from './button.component.style';

interface ButtonProps extends ButtonVariants {
 children: React.ReactNode;
}

function Button({ color, disabled, children }: ButtonProps) {
 return (
  <button type="button" className={button({ color, disabled })}>
   {children}
  </button>
 );
}

export default Button;

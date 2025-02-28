import React from 'react';
import { button, ButtonVariants } from './button.component.style';
import { Link } from 'react-router-dom';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'| 'style'>, ButtonVariants {
 children: React.ReactNode;
}

interface LinkButtonProps extends ButtonVariants {
 children: React.ReactNode;
 pathname: string;
 search?: string;
 hash?: string;
}

export function Button({ color, disabled, children }: ButtonProps) {
 return <button className={button({ color, disabled })}>{children}</button>;
}

export function LinkButton({ disabled, children, pathname, search, hash }: LinkButtonProps) {
 return (
  <Link to={{ pathname, search, hash }} className={button({ style: 'link', disabled })}>
   {children}
  </Link>
 );
}

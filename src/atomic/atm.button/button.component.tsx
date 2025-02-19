import React from 'react';
import { button, ButtonVariants } from './button.component.style';
import { Link } from 'react-router-dom';

interface ButtonProps extends ButtonVariants {
 children: React.ReactNode;
}

interface LinkButtonProps extends ButtonVariants {
 children: React.ReactNode;
 pathname: string;
 search?: string;
 hash?: string;
}

export function Button({ color, disabled, children }: ButtonProps) {
 return (
  <button type="button" className={button({ color, disabled })}>
   {children}
  </button>
 );
}

export function LinkButton({ disabled, children, pathname, search, hash }: LinkButtonProps) {
 return (
  <Link to={{ pathname, search, hash }} className={button({ type: 'link', disabled })}>
   {children}
  </Link>
 );
}

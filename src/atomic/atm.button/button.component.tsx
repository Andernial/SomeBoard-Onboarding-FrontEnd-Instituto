import React from 'react';
import { button, buttonIcon, ButtonVariants } from './button.component.style';
import { Link } from 'react-router-dom';
import arrowIcon from '@assets/icons/Arrow.png';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'style'>, ButtonVariants {
 children: React.ReactNode;
}

interface LinkButtonProps extends ButtonVariants {
 children: React.ReactNode;
 className?: string;
 pathname: string;
 search?: string;
 hash?: string;
 hasIcon?: boolean;
}

export function Button({ color, disabled, children, ...props }: ButtonProps) {
 return <button className={button({ color, disabled, ...props })}>{children}</button>;
}

const { icon } = buttonIcon();

export function LinkButton({ disabled, children, pathname, search, hash, className, hasIcon }: LinkButtonProps) {
 return (
  <Link to={{ pathname, search, hash }} className={button({ style: 'link', className, disabled })}>
   {hasIcon && <img className={`${icon()} mr-2`} src={arrowIcon} />}
   {children}
  </Link>
 );
}

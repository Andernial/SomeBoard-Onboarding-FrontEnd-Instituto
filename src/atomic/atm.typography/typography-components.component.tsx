import { typography, TypographyVariants, InputVariants, input } from './typography.component.style';

interface TypographyProps extends TypographyVariants {
 children: React.ReactNode;
 className?: string;
}

interface TypographyLinkProps extends TypographyVariants {
 children: React.ReactNode;
 className?: string;
 href?: string;
 target?: string;
 rel?: string;
}

interface InputProps extends InputVariants {
 children: React.ReactNode;
 className?: string;
}

const { display, h1, h2, h3, h4, b1, b2, link, linkSmall } = typography();

export function Display({ className, children }: TypographyProps) {
 return <h1 className={display({ className })}>{children}</h1>;
}

export function H1({ className, children }: TypographyProps) {
 return <h1 className={h1({ className })}>{children}</h1>;
}

export function H2({ className, children }: TypographyProps) {
 return <h2 className={h2({ className })}>{children}</h2>;
}

export function H3({ className, children }: TypographyProps) {
 return <h3 className={h3({ className })}>{children}</h3>;
}

export function H4({ className, children }: TypographyProps) {
 return <h4 className={h4({ className })}>{children}</h4>;
}

export function B1({ className, children }: TypographyProps) {
 return <p className={b1({ className })}>{children}</p>;
}

export function B2({ className, children }: TypographyProps) {
 return <p className={b2({ className })}>{children}</p>;
}

export function Link({ className, href, target, rel, children }: TypographyLinkProps) {
 return (
  <a href={href} rel={rel} target={target} className={link({ className })}>
   {children}
  </a>
 );
}

export function LinkSmall({ className, href, target, rel, children }: TypographyLinkProps) {
 return (
  <a href={href} rel={rel} target={target} className={linkSmall({ className })}>
   {children}
  </a>
 );
}

export function InputLabel({ className, children }: InputProps) {
 return <label className={input({ className, type: 'label' })}>{children}</label>;
}

export function InputValue({ className, children }: InputProps) {
 return <label className={input({ className, type: 'value' })}>{children}</label>;
}

export function InputCaption({ className, children }: InputProps) {
 return <span className={input({ className, type: 'caption' })}>{children}</span>;
}

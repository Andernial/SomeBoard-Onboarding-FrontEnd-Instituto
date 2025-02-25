import { tv, VariantProps } from 'tailwind-variants';

export const typography = tv({
 slots: {
  base: 'font-primary text-grayScale-white',
  display: 'font-bold text-2xl leading-1.2',
  h1: 'font-semibold text-xl leading-1.2',
  h2: 'font-semibold text-lg leading-1.2',
  h3: 'font-semibold text-md leading-1.2',
  h4: 'font-medium text-sm leading-1.5',
  b1: 'font-secondary font-regular text-sm text-grayScale-xdark leading-1.5 ',
  b2: 'font-secondary font-regular text-xsm text-grayScale-dark leading-1.5 ',
  link: 'font-secondary font-semibold text-grayScale-dark leading-1.5 text-sm ',
  linkSmall: 'font-secondary font-semibold text-grayScale-dark leading-1.5 text-xsm',
 },
});

export const input = tv({
 base: 'font-secondary text-sm leading-1.5',
 variants: {
  type: {
   label: 'text-grayScale-xdark ',
   value: 'text-grayScale-medium ',
   caption: 'text-feedback-success-dark ',
  },
  error: { true: '!text-feedback-error-dark' },
 },

 compoundVariants: [
  {
   type: 'label',
   error: true,
   className: 'text-grayScale-xdark ',
  },
  {
    type: 'value',
    error: true,
    className: 'text-grayScale-medium  ',
   },
 ],
});

export type TypographyVariants = VariantProps<typeof typography>;
export type InputVariants = VariantProps<typeof input>;

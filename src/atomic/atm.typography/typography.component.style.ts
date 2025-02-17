import { createTV, VariantProps } from 'tailwind-variants';

const tv = createTV({
 twMerge: false,
});

export const typography = tv({
 slots: {
  base: 'font-primary text-grayScale-white',
  display: 'font-bold text-xx-large leading-1.2',
  h1: 'font-semibold text-x-large leading-1.2',
  h2: 'font-semibold text-large leading-1.2',
  h3: 'font-semibold text-medium leading-1.2',
  h4: 'font-medium text-small leading-1.5',
  b1: 'font-secondary font-regular text-small text-grayScale-x-dark leading-1.5 ',
  b2: 'font-secondary font-regular text-x-small text-grayScale-dark leading-1.5 ',
  link: 'font-secondary font-semibold text-grayScale-dark leading-1.5 text-small ',
  linkSmall: 'font-secondary font-semibold text-grayScale-dark leading-1.5 text-x-small',
 },
});

export const input = tv({
 base: 'font-secondary text-x-small leading-1.5',
 variants: {
  type: {
   label: 'text-grayScale-x-dark ',
   value: 'text-grayScale-medium ',
   caption: 'text-feedback-success-dark ',
  },
 },
});

export type TypographyVariants = VariantProps<typeof typography>;
export type InputVariants = VariantProps<typeof input>;

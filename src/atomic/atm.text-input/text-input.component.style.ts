import { tv, VariantProps } from 'tailwind-variants';

export const textInput = tv({
 base:
  'h-lg border bg-transparent rounded-xs focus:outline-none  p-xsm focus:border-brand-primary-dark placeholder:text-grayScale-dark',
 variants: {
  state: {
   default: 'border-grayScale-medium',
  },

  error: {
   true: 'border-feedback-error-medium focus:border-feedback-error-medium',
  },

  disabled: {
   true: 'border-grayScale-xlight',
  },
 },
 defaultVariants: {
  state: 'default',
 },
});

export type TextInputVariants = VariantProps<typeof textInput>;

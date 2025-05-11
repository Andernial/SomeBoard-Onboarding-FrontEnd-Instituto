import { tv, VariantProps } from 'tailwind-variants';

export const boardLabelColors = {
 toDo: 'bg-grayScale-medium',
 inProgress: 'bg-feedback-warning-light',
 review: 'bg-feedback-error-light',
 done: 'bg-feedback-success-light',
};

export const boardLabel = tv(
 {
  base: 'w-fit rounded-md',
  variants: {
   color: boardLabelColors,
  },

  defaultVariants: {
   color: 'toDo',
  },
 },
 { twMerge: true },
);

export type BoardLabelVariants = VariantProps<typeof boardLabel>;

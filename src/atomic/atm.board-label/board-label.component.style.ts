import { CardColumns } from '@data/graphql/generated/graphql';
import { tv, VariantProps } from 'tailwind-variants';

export const boardLabelColors = {
 [CardColumns.ToDo]: 'bg-grayScale-medium',
 [CardColumns.InProgress]: 'bg-feedback-warning-light',
 [CardColumns.InReview]: 'bg-feedback-error-light',
 [CardColumns.Done]: 'bg-feedback-success-light',
};

export const boardLabel = tv(
 {
  base: 'w-fit rounded-md',
  variants: {
   color: boardLabelColors,
  },

  defaultVariants: {
   color: CardColumns.ToDo,
  },
 },
 { twMerge: true },
);

export type BoardLabelVariants = VariantProps<typeof boardLabel>;

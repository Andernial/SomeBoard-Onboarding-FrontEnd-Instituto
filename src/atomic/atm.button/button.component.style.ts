import { tv, VariantProps } from 'tailwind-variants';

export const button = tv({
 base:
  'box-border font-secondary rounded-small p-[2px] w-3/4 m-x-small transition-all duration-500 focus:outline focus:duration-150',
 variants: {
  color: {
   primary:
    'bg-brand-primary-dark hover:bg-brand-primary-x-dark text-grayScale-white  focus:outline-lightGreen active:bg-grayScale-x-dark  ',
   secondary:
    'bg-none text-brand-primary-dark border-2 border-brand-primary-dark hover:text-brand-primary-x-dark hover:border-brand-primary-x-dark active:border-brand-primary-x-dark active:text-brand-primary-x-dark',
   destructive:
    'bg-feedback-error-medium text-grayScale-white hover:bg-feedback-error-dark focus:outline-feedback-error-dark active:bg-feedback-error-x-dark',
   'destructive-secondary':
    'bg-none border-2 text-feedback-error-medium border-feedback-error-medium hover:border-feedback-error-dark hover:text-feedback-error-dark focus:border-feedback-error-medium focus:outline-feedback-error-dark focus:text-feedback-error-medium active:text-feedback-error-x-dark active:border-feedback-error-x-dark',
   cta: 'bg-grayScale-x-dark text-grayScale-white hover:bg-grayScale-dark focus:outline-grayScale-x-dark active:bg-grayScale-xx-dark',
  },

  type: {
   link:
    'bg- text-brand-primary-dark hover:decoration-from-font hover:underline focus:outline-brand-primary-dark active:text-brand-accessory-magenta active:outline-none',
  },

  disabled: {
   true: 'opacity-50 pointer-events-none',
  },
 },

 defaultVariants: {
  color: 'primary',
 },

 compoundVariants: [
  {
   type: 'link',
   color: 'primary',
   className: 'bg-transparent hover:bg-trasparent active:bg-',
  },
  {
   type: 'link',
   disabled: true,
   className: 'text-grayScale-dark opacity-100',
  },
 ],
});

export type ButtonVariants = VariantProps<typeof button>;

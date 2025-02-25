import { tv, VariantProps } from 'tailwind-variants';

export const button = tv({
 base:
  'box-border font-secondary rounded-sm py-xxs px-xs m-xxs transition-all duration-500 focus:outline focus:duration-150',
 variants: {
  color: {
   primary:
    'bg-brand-primary-dark hover:bg-brand-primary-xdark text-grayScale-white  focus:outline-lightGreen active:bg-grayScale-xdark  ',
   secondary:
    'bg-none text-brand-primary-dark border-2 border-brand-primary-dark hover:text-brand-primary-xdark hover:border-brand-primary-xdark active:border-brand-primary-xdark active:text-brand-primary-xdark',
   destructive:
    'bg-feedback-error-medium text-grayScale-white hover:bg-feedback-error-dark focus:outline-feedback-error-dark active:bg-feedback-error-xdark',
   'destructive-secondary':
    'bg-none border-2 text-feedback-error-medium border-feedback-error-medium hover:border-feedback-error-dark hover:text-feedback-error-dark focus:border-feedback-error-medium focus:outline-feedback-error-dark focus:text-feedback-error-medium active:text-feedback-error-xdark active:border-feedback-error-xdark',
   cta: 'bg-grayScale-xdark text-grayScale-white hover:bg-grayScale-dark focus:outline-grayScale-xdark active:bg-grayScale-xxdark',
  },

  type: {
   link:
    'bg-transparent text-brand-primary-dark hover:decoration-from-font hover:underline focus:outline-brand-primary-dark active:text-brand-accessory-magenta active:outline-none',
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
   className: 'bg-transparent hover:bg-trasparent active:bg-transparent',
  },
  {
   type: 'link',
   disabled: true,
   className: 'text-grayScale-dark opacity-100',
  },
 ],
});

export type ButtonVariants = VariantProps<typeof button>;

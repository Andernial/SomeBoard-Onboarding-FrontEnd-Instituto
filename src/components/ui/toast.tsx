import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
 React.ElementRef<typeof ToastPrimitives.Viewport>,
 React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
 <ToastPrimitives.Viewport
  ref={ref}
  className={cn(
   'fixed top-xxs right-xxs z-[100] flex max-h-screen w-full flex-col-reverse p-xxs sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
   className,
  )}
  {...props}
 />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
 'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-neutral-200 p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full dark:border-neutral-800',
 {
  variants: {
   variant: {
    default: 'tw-border tw-bg-white tw-text-neutral-950 dark:tw-bg-neutral-950 dark:tw-text-neutral-50',
    destructive:
     'tw-destructive tw-group tw-border-red-500 tw-bg-red-500 tw-text-neutral-50 dark:tw-border-red-900 dark:tw-bg-red-900 dark:tw-text-neutral-50',
   },
  },
  defaultVariants: {
   variant: 'default',
  },
 },
);

const Toast = React.forwardRef<
 React.ElementRef<typeof ToastPrimitives.Root>,
 React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
 return <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />;
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
 React.ElementRef<typeof ToastPrimitives.Action>,
 React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
 <ToastPrimitives.Action
  ref={ref}
  className={cn(
   'tw-inline-flex tw-h-8 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-neutral-200 tw-bg-transparent tw-px-3 tw-text-sm tw-font-medium tw-ring-offset-white tw-transition-colors hover:tw-bg-neutral-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-neutral-950 focus:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 group-[.destructive]:tw-border-neutral-100/40 group-[.destructive]:hover:tw-border-red-500/30 group-[.destructive]:hover:tw-bg-red-500 group-[.destructive]:hover:tw-text-neutral-50 group-[.destructive]:focus:tw-ring-red-500 dark:tw-border-neutral-800 dark:tw-ring-offset-neutral-950 dark:hover:tw-bg-neutral-800 dark:focus:tw-ring-neutral-300 dark:group-[.destructive]:tw-border-neutral-800/40 dark:group-[.destructive]:hover:tw-border-red-900/30 dark:group-[.destructive]:hover:tw-bg-red-900 dark:group-[.destructive]:hover:tw-text-neutral-50 dark:group-[.destructive]:focus:tw-ring-red-900',
   className,
  )}
  {...props}
 />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
 React.ElementRef<typeof ToastPrimitives.Close>,
 React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
 <ToastPrimitives.Close
  ref={ref}
  className={cn(
   'tw-absolute tw-right-2 tw-top-2 tw-rounded-md tw-p-1 tw-text-neutral-950/50 tw-opacity-0 tw-transition-opacity hover:tw-text-neutral-950 focus:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 group-hover:tw-opacity-100 group-[.destructive]:tw-text-red-300 group-[.destructive]:hover:tw-text-red-50 group-[.destructive]:focus:tw-ring-red-400 group-[.destructive]:focus:tw-ring-offset-red-600 dark:tw-text-neutral-50/50 dark:hover:tw-text-neutral-50',
   className,
  )}
  toast-close=""
  {...props}
 >
  <X className="tw-h-4 tw-w-4" />
 </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
 React.ElementRef<typeof ToastPrimitives.Title>,
 React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
 <ToastPrimitives.Title ref={ref} className={cn('tw-text-sm tw-font-semibold', className)} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
 React.ElementRef<typeof ToastPrimitives.Description>,
 React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
 <ToastPrimitives.Description ref={ref} className={cn('tw-text-sm tw-opacity-90', className)} {...props} />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
 type ToastProps,
 type ToastActionElement,
 ToastProvider,
 ToastViewport,
 Toast,
 ToastTitle,
 ToastDescription,
 ToastClose,
 ToastAction,
};

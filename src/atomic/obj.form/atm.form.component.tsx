import { Form } from '@components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { z, ZodType } from 'zod';

interface FormProps<T extends ZodType> extends React.FormHTMLAttributes<HTMLFormElement> {
 form: UseFormReturn<z.infer<T>>;
 onSubmit: (data: z.infer<T>) => void;
}

export function FormAtm<T extends ZodType>({ form, children, onSubmit, ...props }: FormProps<T>) {
 return (
  <Form {...form}>
   <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
    {children}
   </form>
  </Form>
 );
}

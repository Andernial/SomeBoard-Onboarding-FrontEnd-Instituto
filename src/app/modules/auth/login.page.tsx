import { Button, LinkButton } from '@/atomic/atm.button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { AuthRoutes } from './auth.rotes';
import { B1, H1, InputCaption, InputLabel } from '@/atomic/atm.typography';
import { loginPageStrings } from './login.page.strings';
import { PasswordInput, TextInput } from '@/atomic/atm.text-input';
import { loginFormSchema } from '@/atomic/obj.form/zod-schemas/login-form-schema';
import { useLogin } from '@domain/auth/login.use-case';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import errorCaptionIcon from '@assets/icons/error-caption.png';
import z from 'zod';

function LoginPage() {
 const [reqError, setReqError] = useState('');

 const form = useForm<z.infer<typeof loginFormSchema>>({
  resolver: zodResolver(loginFormSchema),
  defaultValues: {
   password: '',
   email: '',
  },
 });

 const navigate = useNavigate();

 const { loginMutation, loading } = useLogin({
  onCompleted: (data) => {
   navigate('/');
  },
  onError: (data) => {
   setReqError(data.message);
  },
 });

 const handleSubmit = (values: z.infer<typeof loginFormSchema>) => {
  const loginData = { email: values.email, password: values.password };
  loginMutation({ variables: { loginData } });
 };

 const handleInputFocus = () => {
  setReqError('');
 };

 return (
  <div className="flex bg-grayScale-white min-h-screen w-full">
   <section className="flex flex-col items-center w-1/2">
    <header className="w-full">
     <LinkButton className="my-md mt-sm ml-sm pl-[0] block w-fit" hasIcon pathname={AuthRoutes.HOME}>
      Voltar para o início
     </LinkButton>
    </header>

    <Form {...form}>
     <form
      className="h-full flex items-center justify-center"
      onSubmit={form.handleSubmit(handleSubmit)}
      onChange={handleInputFocus}
     >
      <div className="flex flex-col items-center w-[400px] h-max[478px] px-sm pt-md">
       <H1>{loginPageStrings.formTitle}</H1>
       <B1 className="text-center pt-xxs pb-md">{loginPageStrings.formSubtitle}</B1>
       {reqError ? (
        <div className="inline-flex items-start gap-[2px]">
         <img className="mt-[2px]" src={errorCaptionIcon} />
         <InputCaption className="break-words whitespace-normal" error={true}>
          {reqError}
         </InputCaption>
        </div>
       ) : null}

       <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
         <FormItem>
          <InputLabel className="my-xxs">{loginPageStrings.labels.email}</InputLabel>
          <FormControl>
           <TextInput
            error={!!form.formState.errors.email}
            placeholder={loginPageStrings.placeHolders.email}
            {...field}
           />
          </FormControl>
          {form.formState.errors.email ? (
           <div className="inline-flex items-start gap-[2px]">
            <img className="mt-[2px]" src={errorCaptionIcon} alt="" />
            <InputCaption error={!!form.formState.errors.email}>{form.formState.errors.email?.message}</InputCaption>
           </div>
          ) : null}
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
         <FormItem>
          <InputLabel className="my-xxs">{loginPageStrings.labels.password}</InputLabel>
          <FormControl>
           <PasswordInput
            error={!!form.formState.errors.password}
            className="w-full "
            placeholder={loginPageStrings.placeHolders.password}
            {...field}
           />
          </FormControl>
          {form.formState.errors.password ? (
           <div className="inline-flex items-start gap-[2px]">
            <img className="mt-[2px]" src={errorCaptionIcon} alt="" />
            <InputCaption error={!!form.formState.errors.password}>
             {form.formState.errors.password?.message}
            </InputCaption>
           </div>
          ) : null}
         </FormItem>
        )}
       />
       <LinkButton className="self-end mt-xs" pathname="placeholder">
        {loginPageStrings.forgotMessage}
       </LinkButton>
       <Button type="submit" className="w-full mt-md" color="primary" disabled={!!loading}>
        Entrar
       </Button>
       <div className="flex items-center w-full pt-xs">
        <hr className="flex-grow border-t border-grayScale-xlight border-dashed" />
        <span className="px-sm">ou</span>
        <hr className="flex-grow border-t border-grayScale-xlight border-dashed" />
       </div>
       <B1>
        <span>{loginPageStrings.accountQuestion}</span>
        <span>
         <LinkButton className="px-xxs inline-flex" pathname="placeholder">
          {loginPageStrings.register}
         </LinkButton>
        </span>
       </B1>
      </div>
     </form>
    </Form>
   </section>

   <section className="w-1/2 h-svh flex justify-end bg-guina bg-cover bg-center bg-no-repeat"></section>
  </div>
 );
}

export default LoginPage;

import { Button, LinkButton } from '@/atomic/atm.button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { AuthRoutes } from './auth.rotes';
import { B1, H1, InputLabel } from '@/atomic/atm.typography';
import { loginPageStrings } from './login.page.strings';
import { PasswordInput, TextInput } from '@/atomic/atm.text-input';
import { loginFormSchema } from '@/atomic/obj.form/zod-schemas/login-form-schema';
import { useLogin } from '@domain/auth/login.use-case';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ErrorCaption } from '@atomic/atm.error-caption';
import { useUserStorage } from '@/app/stores/user.store';
import { useAuthStorage } from '@/app/stores/auth.store';
import z from 'zod';


function LoginPage() {
 const [reqError, setReqError] = useState<string>();

 const { addUser } = useUserStorage();
 const { addToken } = useAuthStorage();

 const form = useForm<z.infer<typeof loginFormSchema>>({
  resolver: zodResolver(loginFormSchema),
  mode: 'onChange',
  defaultValues: {
   password: '',
   email: '',
  },
 });

 const navigate = useNavigate();

 const { loginMutation, loading } = useLogin({
  onCompleted: (data) => {
   const user = data.login.user;

   addUser({ name: user.name, id: user.id });
   addToken(data.login.token);

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
      {loginPageStrings.backToHome}
     </LinkButton>
    </header>

    <Form {...form}>
     <form
      className="h-full flex items-center justify-center"
      onSubmit={form.handleSubmit(handleSubmit)}
      onChange={handleInputFocus}
     >
      <div className="flex flex-col items-center w-[400px] h-max[478px] px-xs">
       <H1>{loginPageStrings.formTitle}</H1>
       <B1 className="text-center pt-xxs pb-md">{loginPageStrings.formSubtitle}</B1>
       {reqError ? <ErrorCaption>{reqError}</ErrorCaption> : null}

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
          {form.formState.errors.email ? <ErrorCaption>{form.formState.errors.email.message}</ErrorCaption> : null}
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
           <ErrorCaption>{form.formState.errors.password.message}</ErrorCaption>
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
        {loginPageStrings.accountQuestion}
        <span>
         <LinkButton
          className="px-xxs"
          pathname={AuthRoutes.REGISTER}
          style='linkSecondary'
         >
          {loginPageStrings.register}
         </LinkButton>
        </span>
       </B1>
      </div>
     </form>
    </Form>
   </section>

   <section className="w-1/2 flex justify-end bg-guina bg-no-repeat bg-center "></section>
  </div>
 );
}

export default LoginPage;

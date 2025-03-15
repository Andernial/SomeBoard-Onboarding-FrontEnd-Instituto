import { Button, LinkButton } from '@/atomic/atm.button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { AuthRoutes } from './auth.rotes';
import { B1, H1, InputLabel } from '@/atomic/atm.typography';
import { registerPageStrings } from './register.page.strings';
import { PasswordInput, TextInput } from '@/atomic/atm.text-input';
import checkBox from '@/assets/icons/CheckBox.png';
import checkBoxSelected from '@/assets/icons/Checkbox-Selected.png';
import { loginFormSchema } from '@/atomic/obj.form/zod-schemas/login-form-schema';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ErrorCaption } from '@atomic/atm.error-caption';
import { registerFormSchema } from '@atomic/obj.form/zod-schemas/register-form.schema';
import { FormAtm } from '@atomic/obj.form/atm.form.component';

function RegisterPage() {
 const [reqError, setReqError] = useState('');

 const form = useForm<z.infer<typeof registerFormSchema>>({
  resolver: zodResolver(registerFormSchema),
  mode: 'onChange',
  defaultValues: {
   name: '',
   confirmPassword: '',
   password: '',
   email: '',
   terms: false,
  },
 });

 const navigate = useNavigate();

 const handleSubmit = (values: z.infer<typeof loginFormSchema>) => {
  console.log(values);
 };

 const handleInputFocus = () => {
  setReqError('');
 };

 return (
  <div className="flex bg-grayScale-white h-screen w-full">
   <section className="flex flex-col items-center max-h-screen overflow-y-auto w-1/2">
    <header className="w-full">
     <LinkButton className="mb-md mt-sm ml-sm pl-[0] block w-fit" hasIcon pathname={AuthRoutes.HOME}>
      {registerPageStrings.backToHome}
     </LinkButton>
    </header>

    <FormAtm
     form={form}
     onSubmit={handleSubmit}
     onChange={handleInputFocus}
     className="h-full flex items-center justify-center "
    >
     <div className="flex flex-col items-center w-[400px] max-h-svh px-xs ">
      <H1>{registerPageStrings.formTitle}</H1>
      <B1 className="text-center pt-xxs pb-md">{registerPageStrings.formSubTitle}</B1>
      {reqError ? <ErrorCaption>{reqError}</ErrorCaption> : null}
      <FormField
       control={form.control}
       name="name"
       render={({ field }) => (
        <FormItem>
         <InputLabel className="my-xxs">{registerPageStrings.labels.name}</InputLabel>
         <FormControl>
          <TextInput error={!!form.formState.errors.name} placeholder={registerPageStrings.labels.name} {...field} />
         </FormControl>
         {form.formState.errors.name ? <ErrorCaption>{form.formState.errors.name.message}</ErrorCaption> : null}
        </FormItem>
       )}
      />
      <FormField
       control={form.control}
       name="email"
       render={({ field }) => (
        <FormItem>
         <InputLabel className="my-xxs">{registerPageStrings.labels.email}</InputLabel>
         <FormControl>
          <TextInput error={!!form.formState.errors.email} placeholder={registerPageStrings.labels.email} {...field} />
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
         <InputLabel className="my-xxs">{registerPageStrings.labels.password}</InputLabel>
         <FormControl>
          <PasswordInput
           error={!!form.formState.errors.password}
           className="w-full "
           placeholder={registerPageStrings.labels.password}
           {...field}
          />
         </FormControl>
         {form.formState.errors.password ? <ErrorCaption>{form.formState.errors.password.message}</ErrorCaption> : null}
        </FormItem>
       )}
      />
      <FormField
       control={form.control}
       name="confirmPassword"
       render={({ field }) => (
        <FormItem>
         <InputLabel className="my-xxs">{registerPageStrings.labels.confirmPassword}</InputLabel>
         <FormControl>
          <PasswordInput
           error={!!form.formState.errors.confirmPassword}
           className="w-full "
           placeholder={registerPageStrings.labels.confirmPassword}
           {...field}
          />
         </FormControl>
         {form.formState.errors.confirmPassword ? (
          <ErrorCaption>{form.formState.errors.confirmPassword.message}</ErrorCaption>
         ) : null}
        </FormItem>
       )}
      />

      <FormField
       control={form.control}
       name="terms"
       render={({ field }) => (
        <FormItem>
         <div className="flex items-start">
          <img
           className="self-start hover:cursor-pointer  pt-sm pr-xs select-none"
           src={field.value ? checkBoxSelected : checkBox}
           onClick={() => field.onChange(!field.value)}
          />
          <B1 className="py-sm">
           {registerPageStrings.termsOfUse}
           <LinkButton
            style="linkSecondary"
            className="mt-xs py-[0px] w-full pr-xxs pl-xxs align-middle"
            pathname="placeholder"
           >
            {registerPageStrings.termsOfUseLink}
           </LinkButton>
           <span>e</span>
           <LinkButton
            style="linkSecondary"
            className="mt-xs py-[0px] pr-xxs pl-xxs align-middle"
            pathname="placeholder"
           >
            {registerPageStrings.privacyTerms}
           </LinkButton>
          </B1>
         </div>
         {form.formState.errors.terms ? <ErrorCaption>{form.formState.errors.terms.message}</ErrorCaption> : null}
        </FormItem>
       )}
      />

      <Button type="submit" className="w-full mt-md" color="primary">
       {registerPageStrings.submit}
      </Button>
      <div className="flex items-center w-full pt-xs">
       <hr className="flex-grow border-t border-grayScale-xlight border-dashed" />
       <span className="px-sm">ou</span>
       <hr className="flex-grow border-t border-grayScale-xlight border-dashed" />
      </div>
      <B1>
       {registerPageStrings.hasAccountMessage}
       <span>
        <LinkButton style="linkSecondary" className="pl-xxs" pathname={AuthRoutes.LOGIN}>
         {registerPageStrings.login}
        </LinkButton>
       </span>
      </B1>
     </div>
    </FormAtm>
   </section>

   <section className="w-1/2 flex justify-end bg-guina bg-no-repeat bg-center"></section>
  </div>
 );
}

export default RegisterPage;

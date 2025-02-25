import { loginPageStrings } from './login.page.strings';
import { Button } from '@/atomic/atm.button';
import { PasswordInput, TextInput } from '@/atomic/atm.text-input';

function LoginPage() {
 return (
  <div className="flex flex-col items-center bg-brand-accessory-xlight min-h-screen w-full">
   <header className="flex justify-center items-center h-30">
    <h1 className="font-serif text-grayScale-dark text-2xl p-medium">Login</h1>
   </header>
   <div className="h-64 w-56 bg-white rounded-2xl text-center flex flex-col justify-center items-center">
    <form action="" className="flex flex-col justify-center items-center">
     <label htmlFor="email">{loginPageStrings.labels.email}</label>
     <TextInput placeholder={loginPageStrings.placeHolders.email} />
     <label htmlFor="password">{loginPageStrings.labels.password}</label>
     <PasswordInput placeholder={loginPageStrings.placeHolders.password} />
     <Button>{loginPageStrings.sumbmitButton}</Button>
    </form>
   </div>
  </div>
 );
}

export default LoginPage;

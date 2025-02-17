import { loginPageStrings } from './login.page.strings';
import {Button} from '@atomic/atm.button/button.component';

function LoginPage() {
 return (
  <div className="flex flex-col items-center bg-brand-accessory-x-light min-h-screen w-full">
   <header className="flex justify-center items-center h-30">
    <h1 className="text-4xl font-serif text-grayScale-dark text-xx-large p-medium">Login</h1>
   </header>
   <div className="h-64 w-56 bg-white rounded-2xl text-center flex flex-col justify-center items-center">
    <form action="" className="flex flex-col justify-center items-center">
     <label htmlFor="email">{loginPageStrings.labels.email}</label>
     <input type="text" className="generic-input" name="email" id="" />
     <label htmlFor="password">{loginPageStrings.labels.password}</label>
     <input type="text" className="generic-input" name="password" id="" />
     <Button>{loginPageStrings.sumbmitButton}</Button>
    </form>
   </div>
  </div>
 );
}

export default LoginPage;

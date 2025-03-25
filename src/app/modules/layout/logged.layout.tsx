import { Outlet } from 'react-router-dom';
import { Link } from '@atomic/atm.typography';
import { useUserStorage } from '@/app/stores/user.store';
import { DropDownMenu } from '@atomic/atm.drop-down/drop-down.component';
import {
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import logo from '@/assets/images/Logo_Reduzido_Negativo_Colorido.png';
import placeholderProfile from '@/assets/images/placeholder-profile.png';

const loggedLayoutStrings = {
 myAccount: 'Minha Conta',
 myProfile: 'Perfil',
};

export function LoggedLayout() {
 const { name } = useUserStorage.getState();

 return (
  <div className="w-full h-full">
   <header className="w-full h-[64px] bg-grayScale-white flex justify-around items-center gap-xl absolute  select-none">
    <img src={logo} alt="logo" className="size-lg mr-xl" />
    <div>
     <img className="inline-flex mr-xxs ml-xl" src={placeholderProfile} alt="profile-image" />
     <Link>{name}</Link>
     <DropDownMenu>
      <DropdownMenuContent className="bg-grayScale-white p-xxs text-center border border-grayScale-xxdark rounded-xs select-none">
       <DropdownMenuLabel className="font-bold">{loggedLayoutStrings.myAccount}</DropdownMenuLabel>
       <DropdownMenuSeparator className="mx-xxs my-xxs h-[1px] bg-grayScale-xxdark" />
       <DropdownMenuItem>{loggedLayoutStrings.myProfile}</DropdownMenuItem>
      </DropdownMenuContent>
     </DropDownMenu>
    </div>
   </header>

   <Outlet />
  </div>
 );
}

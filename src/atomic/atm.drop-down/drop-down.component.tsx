import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import menuArrow from '@/assets/icons/menu-arrow.png';
import menuArrowUp from '@/assets/icons/menu-arrow-up.png';

interface DropDownMenuProps {
 children: React.ReactNode;
}

export function DropDownMenu({ children }: DropDownMenuProps) {
 const [isOpen, setIsOpen] = useState(false);

 return (
  <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
   <DropdownMenuTrigger className="select-none focus:outline-none">
    <img className="inline-flex ml-xxs select-none" src={!isOpen ? menuArrow : menuArrowUp} alt="drop-arrow" />
   </DropdownMenuTrigger>
   {children}
  </DropdownMenu>
 );
}

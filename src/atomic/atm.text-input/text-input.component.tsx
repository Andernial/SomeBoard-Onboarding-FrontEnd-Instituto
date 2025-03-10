import { useState } from 'react';
import { TextInputVariants, inputIcon, textInput } from './text-input.component.style';
import { Input } from '@/components/ui/input';
import eyeOn from '@assets/icons/eye-on.png';
import eyeOff from '@assets/icons/eye-off.png';

interface textInputProps extends React.ComponentProps<typeof Input>, TextInputVariants {
 className?: string;
 placeholder?: string;
}

export function TextInput({ error, className, ...props }: textInputProps) {
 return <Input className={textInput({ error, className, ...props })} {...props} />;
}

const { icon, button } = inputIcon();

export function PasswordInput({ error, className, ...props }: textInputProps) {
 const [showPassword, setShowPassword] = useState(false);
 return (
  <div className="relative w-full flex items-center">
   <Input type={showPassword ? 'text' : 'password'} className={textInput({ error, className, ...props })} {...props} />
   <button className={button()} type="button" onClick={() => setShowPassword(!showPassword)}>
    <img className={icon()} src={showPassword ? eyeOff : eyeOn} />
   </button>
  </div>
 );
}

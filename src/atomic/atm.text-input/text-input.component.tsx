import { TextInputVariants, textInput } from './text-input.component.style';
import { Input } from '@/components/ui/input';

interface textInputProps extends React.ComponentProps<typeof Input>, TextInputVariants {
 className?: string;
 placeholder?: string;
}

export function TextInput({ error, ...props }: textInputProps) {
 return <Input className={textInput({ error, ...props })} {...props} />;
}

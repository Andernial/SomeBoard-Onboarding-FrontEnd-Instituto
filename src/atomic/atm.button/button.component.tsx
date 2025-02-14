import { button, ButtonVariants } from './button.component.style';

interface ButtonProps extends ButtonVariants {
 label: string;
}

function Button(props: ButtonProps) {
 return <button type='button' className={button(props)}>{props.label}</button>;
}

export default Button;

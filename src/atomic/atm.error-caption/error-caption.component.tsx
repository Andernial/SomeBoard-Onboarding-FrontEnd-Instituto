import { InputCaption } from '@atomic/atm.typography';
import errorCaptionIcon from '@assets/icons/error-caption.png';

interface ErrorCaptionProps {
 children: React.ReactNode;
 className?: string;
}

export function ErrorCaption({ children, className }: ErrorCaptionProps) {
 return (
  <div className="inline-flex items-start gap-[2px]">
   <img className="mt-[2px]" src={errorCaptionIcon} alt="" />
   <InputCaption error={true} className={className}>
    {children}
   </InputCaption>
  </div>
 );
}

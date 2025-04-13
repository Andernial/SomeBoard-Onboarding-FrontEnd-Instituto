import clsx from 'clsx';
import cardPlaceHolder from '@assets/images/card-placeholder.png';

interface CardProps {
 children: React.ReactNode;
 className?: string;
}

export function Card({ children, className }: CardProps) {
 return (
  <div
   className={clsx(
    'w-1/5 h-1/2 flex flex-col border-2  border-grayScale-light rounded-sm cursor-pointer overflow-hidden',
    className,
   )}
  >
   <img src={cardPlaceHolder} className="rounded-t-sm h-1/2 w-full" />
   <section className="flex flex-col justify-center px-4 h-1/2">{children}</section>
  </div>
 );
}

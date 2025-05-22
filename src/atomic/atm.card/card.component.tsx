import clsx from 'clsx';

interface CardProps {
 children: React.ReactNode;
 onClick?: () => void;
 className?: string;
}

export function Card({ children, className, onClick }: CardProps) {
 return (
  <div
   className={clsx(
    'w-full flex flex-col border-2  border-grayScale-light rounded-sm cursor-pointer overflow-hidden',
    className,
   )}

   onClick={onClick}
  >
   <section className="flex flex-col justify-center h-1/2">{children}</section>
  </div>
 );
}

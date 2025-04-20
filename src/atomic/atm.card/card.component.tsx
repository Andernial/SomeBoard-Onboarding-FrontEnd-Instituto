import clsx from 'clsx';

interface CardProps {
 children: React.ReactNode;
 className?: string;
}

export function Card({ children, className }: CardProps) {
 return (
  <div
   className={clsx(
    ' w-full flex flex-col border-2  border-grayScale-light rounded-sm cursor-pointer overflow-hidden',
    className,
   )}
  >
   <section className="flex flex-col justify-center h-1/2">{children}</section>
  </div>
 );
}

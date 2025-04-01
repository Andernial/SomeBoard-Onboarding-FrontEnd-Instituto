import clsx from 'clsx';

interface CardProps {
 children: React.ReactNode;
 className?: string;
}

export function Card({ children, className }: CardProps) {
 return (
  <div
   className={clsx(
    'size-[247px] mt-sm mb-sm flex flex-col border-2 border-grayScale-light rounded-sm cursor-pointer ',
    className,
   )}
  >
   <section className="bg-card-placeholder rounded-t-sm h-1/2"></section>
   <section className="flex flex-col justify-center ml-sm mr-sm h-1/2">{children}</section>
  </div>
 );
}

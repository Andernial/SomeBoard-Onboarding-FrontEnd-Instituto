import { Skeleton } from '@components/ui/skeleton';
import clsx from 'clsx';

interface CardSkeletonProps {
 className?: string;
}

export function CardSkeleton({ className }: CardSkeletonProps) {
 return (
  <div
   className={clsx(
    'size-[247px] mt-sm mb-sm flex flex-col border-2 border-grayScale-light rounded-sm cursor-pointer',
    className,
   )}
  >
   <Skeleton className="bg-grayScale-medium rounded-t-sm h-1/2" />
   <section className="flex flex-col gap-xxs justify-center ml-sm mr-sm h-1/2">
    <Skeleton className="bg-grayScale-medium rounded-xs w-1/2 h-xs" />
    <Skeleton className="bg-grayScale-medium rounded-xs w-full h-xs" />
   </section>
  </div>
 );
}

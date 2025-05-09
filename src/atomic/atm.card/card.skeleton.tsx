import { Skeleton } from '@components/ui/skeleton';
import clsx from 'clsx';

interface CardSkeletonProps {
 className?: string;
}

export function CardSkeleton({ className }: CardSkeletonProps) {
 return (
  <div
   className={clsx(
    'w-full h-full flex flex-col border-2 border-grayScale-light rounded-sm cursor-pointer',
    className,
   )}
  >
   <Skeleton className="bg-grayScale-medium rounded-t-sm py-lg" />
   <section className="flex flex-col gap-xxs justify-center pt-sm pb-lg">
    <Skeleton className="bg-grayScale-medium rounded-xs w-1/2 ml-sm h-xs" />
    <Skeleton className="bg-grayScale-medium rounded-xs w-3/4 ml-sm h-xs " />
   </section>
  </div>
 );
}


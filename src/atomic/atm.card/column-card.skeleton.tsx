import { Skeleton } from '@components/ui/skeleton';
import clsx from 'clsx';

interface CardSkeletonProps {
 className?: string;
}

export function ColumnCardSkeleton({ className }: CardSkeletonProps) {
 return (
  <div className={clsx('w-[90%] flex flex-col bg-grayScale-white rounded-sm cursor-pointer mt-xxs', className)}>
   <Skeleton className="bg-grayScale-medium rounded-xs w-1/2 mt-sm ml-sm h-xs" />
   <div className='inline-flex gap-xxxs mt-xs'>
    <Skeleton className="bg-grayScale-medium rounded-[50%] w-xs ml-sm h-xs" />
    <Skeleton className="bg-grayScale-medium rounded-xs w-1/2 mr-sm h-xs" />
   </div>
   <div className='inline-flex gap-xxxs my-sm mb-xs'>
    <Skeleton className="bg-grayScale-medium rounded-xs w-1/2 ml-sm h-xs" />
    <Skeleton className="bg-grayScale-medium rounded-xs w-1/2 mr-sm h-xs" />
   </div>
  </div>
 );
}

import clsx from 'clsx';
import { B1, B2, H4 } from '@atomic/atm.typography';
import placeholder from '@assets/images/placeholder-profile.png';
import comment from '@assets/icons/edit-empty.png';
import info from '@assets/icons/information.png'

interface MockCardModel {
name: string;
createdAt: string;
}

interface CardProps {
 card: MockCardModel;
 onClick?: () => void;
 className?: string;
}

const CardStrings = {
    title: 'Título da tarefa criada',
    comments: '0 comentários'
}

export function KanbanCard({ className, card ,onClick }: CardProps) {
 return (
  <div className={clsx(' w-[90%] bg-grayScale-white rounded-sm flex flex-col items-center', className)}>
   <div className="w-[90%]">
    <H4 className="pt-xs text-start">{CardStrings.title}</H4>
    <div className="inline-flex gap-xxs pt-xxs">
     <img src={placeholder} className="size-xs mt-xxxs" />
     <B1 className="text-ellipsis overflow-hidden whitespace-nowrap">{card.name}</B1>
    </div>
    <div className="inline-flex gap-xxs py-xs">
     <div className="inline-flex gap-xxxs">
      <img src={comment} className="size-xs mt-[2px]" />
      <B2 className="text-ellipsis overflow-hidden whitespace-nowrap">{CardStrings.comments}</B2>
     </div>

     <div className="inline-flex gap-xxxs">
      <img src={info} className="size-xs mt-[2px]" />
      <B2 className="text-ellipsis overflow-hidden whitespace-nowrap">{card.createdAt}</B2>
     </div>
    </div>
   </div>
  </div>
 );
}

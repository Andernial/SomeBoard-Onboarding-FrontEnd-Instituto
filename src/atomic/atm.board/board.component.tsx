import { BoardLabel } from '@atomic/atm.board-label/board-label.component';
import { B1, H4, Link } from '@atomic/atm.typography';
import { boardStrings } from '@/app/modules/board/board-page.strings';
import { BoardLabelVariants } from '@atomic/atm.board-label/board-label.component.style';
import moreIcon from '@assets/icons/more.png';
import addIcon from '@assets/icons/add.png';
import { KanbanCard } from '@atomic/atm.card/kanban-card.component';

interface MockCardModel {
 name: string;
 createdAt: string;
}
interface BoardProps {
 columName: string;
 columnType: BoardLabelVariants['color'];
 cards: MockCardModel[];
}

export function BoardColumn({ columName, columnType, cards }: BoardProps) {
 return (
  <div className="flex items-center flex-col h-[70vh] max-h-[660px] bg-grayScale-white rounded-md">
   <div className="w-[87%] mt-sm inline-flex items-center justify-between">
    <BoardLabel color={columnType}>{columName}</BoardLabel>
    <img src={moreIcon} className="size-sm" />
   </div>

   <div className="bg-grayScale-xlight w-[87%] h-3/4 flex flex-col items-center rounded-sm mt-sm overflow-y-auto p-xxs">
   {cards.map((card) => (
    <KanbanCard card={card} className='mt-xxs'/>
   ))}
   </div>

   <div className="inline-flex justify-center items-center gap-xxs py-sm border-grayScale-light rounded-sm cursor-pointer">
    <img src={addIcon} className="size-sm pb-[2px]" />
    <Link>{boardStrings.createTask}</Link>
   </div>
  </div>
 );
}

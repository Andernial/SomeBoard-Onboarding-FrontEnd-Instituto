import { H1 } from '@atomic/atm.typography';
import { boardStrings } from './board-page.strings';
import { BoardColumn } from '@atomic/atm.board/board.component';

const boardColumns = [
    { columName: 'A fazer', columnType: 'toDo' },
    { columName: 'Fazendo', columnType: 'inProgress' },
    { columName: 'Review', columnType: 'review' },
    { columName: 'Finalizado', columnType: 'done' },
  ] as const;

export function BoardPage() {
 return (
  <div className="bg-grayScale-xlight min-h-full w-full flex flex-col items-center text-start ">
   <div className="w-4/5">
    <H1 className="pt-lg">{boardStrings.title}</H1>
   </div>
   <div className="grid grid-cols-4 h-full w-4/5 gap-sm pt-md">
    {boardColumns.map((type) => (
     <BoardColumn columName={type.columName} columnType={type.columnType} />
    ))}
   </div>
  </div>
 );
}

import { H1 } from '@atomic/atm.typography';
import { boardStrings } from './board-page.strings';
import { BoardColumn } from '@atomic/atm.board/board.component';
import React from 'react';

const boardColumns = [
 { columName: 'A fazer', columnType: 'toDo' },
 { columName: 'Fazendo', columnType: 'inProgress' },
 { columName: 'Review', columnType: 'review' },
 { columName: 'Finalizado', columnType: 'done' },
] as const;

const cards = [
 { name: 'card1', createdAt: '2025-01-10', columnType: 'toDo' },
 { name: 'card2', createdAt: '2025-01-10', columnType: 'toDo' },
 { name: 'card3', createdAt: '2025-01-10', columnType: 'toDo' },
 { name: 'teste tarefa', createdAt: '2025-01-10', columnType: 'toDo' },
 { name: 'card4', createdAt: '2025-01-10', columnType: 'inProgress' },
 { name: 'card4', createdAt: '2025-01-10', columnType: 'review' },
];

export function BoardPage() {
 return (
  <div className="bg-grayScale-xlight min-h-full w-full flex flex-col items-center text-start ">
   <div className="w-[90%]">
    <H1 className="pt-lg">{boardStrings.title}</H1>
   </div>
   <div className="grid grid-cols-4 h-full w-[90%] gap-sm pt-md">
    {boardColumns.map((type) => (
     <React.Fragment key={type.columnType}>
      <BoardColumn
       columName={type.columName}
       columnType={type.columnType}
       cards={cards.filter((card) => card.columnType === type.columnType)}
      />
     </React.Fragment>
    ))}
   </div>
  </div>
 );
}

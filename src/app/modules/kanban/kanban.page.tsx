import { B1, H1, H3 } from '@atomic/atm.typography';
import { kanbanStrings } from './kanban.page.strings';
import emptyPlaceholder from '@assets/images/Empty-State.png';
import { Button } from '@atomic/atm.button';
import { useState } from 'react';

export function KanbanPage() {
 const [placeholders, setPlaceholders] = useState([]);
 return (
  <div className="bg-grayScale-xlight min-h-full w-full flex flex-col  items-center text-start">
      <div className="w-4/5">
    <H1 className="pt-lg">{kanbanStrings.title}</H1>
  </div>
    <div className="bg-grayScale-white  h-2/3 pb-xl pt-xl my-md flex flex-col justify-center w-4/5 items-center rounded-md">
    {placeholders.length ? (
     placeholders.map((item) => <p>{item}</p>)
    ) : (
     <>
      <img src={emptyPlaceholder} alt="" />
      <H3 className="pt-sm">{kanbanStrings.emptyState.title}</H3>
      <B1 className="pt-xxs">{kanbanStrings.emptyState.subTitle}</B1>
      <Button color="cta" className="mt-sm">
       {kanbanStrings.createButton}
      </Button>
     </>
    )}
    </div>
  </div>
 );
}

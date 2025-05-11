import { boardLabel, BoardLabelVariants } from './board-label.component.style';

interface BoardLabelProps extends BoardLabelVariants {
 children: React.ReactNode;
 className?: string;
}

export function BoardLabel({ children, className, color }: BoardLabelProps) {
 return (
  <div className={boardLabel({ color, className })}>
   <p className="p-xxs font-secondary">{children}</p>
  </div>
 );
}

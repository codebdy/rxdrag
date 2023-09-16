import { useMemo } from 'react';
import { useActiveIdState } from '../../hooks/useActiveIdState';
import { useOverIdState } from '../../hooks/useOverIdState';
import { useOffsetLeftState } from '../../hooks/useOffsetLeftState';
import { useItemsState } from '../../hooks/useItemsState';
import { SortableItem } from './SortableItem';
import { CANVS_ID } from '../../consts';


export type SortableTreeProps = {
  indentationWidth?: number;
  indicator?: boolean;
  isNewing?: boolean
}

export function SortableTree({
  indicator = true,
  indentationWidth = 50,
}: SortableTreeProps) {
  const [items] = useItemsState();
  const [activeId] = useActiveIdState();
  const [overId] = useOverIdState();
  const [offsetLeft] = useOffsetLeftState();

  const sortedIds = useMemo(() => items.map(item => item.id), [items])

  return (
    <SortableContext id={CANVS_ID} items={sortedIds} strategy={verticalListSortingStrategy}>
      {
        items.map((item) => {
          return (<SortableItem key={item.id} item={item} />)
        })

      }
      {/* {!isNewing && createPortal(//如果是新增项目，不显示鼠标跟随
        <DragOverlay
          dropAnimation={dropAnimationConfig}
          modifiers={indicator ? [adjustTranslate] : undefined}
        >
          {activeId && activeItem ? (
            <SortableTreeItem
              id={activeId}
              depth={activeItem.depth}
              clone
              childCount={getChildCount(items, activeId) + 1}
              value={activeId.toString()}
              indentationWidth={indentationWidth}
            />
          ) : null}
        </DragOverlay>,
        document.body
      )} */}
    </SortableContext>
  );

}

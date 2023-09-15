import { useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  DragOverlay,
  Modifier,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {
  flattenTree,
  getProjection,
  getChildCount,
  removeItem,
  removeChildrenOf,
  setProperty,
} from '../../utilities';
import type { SensorContext } from '../../types';
import { SortableTreeItem } from '..';
import { useActiveIdState } from '../../hooks/useActiveIdState';
import { useOverIdState } from '../../hooks/useOverIdState';
import { useOffsetLeftState } from '../../hooks/useOffsetLeftState';
import { useItemsState } from '../../hooks/useItemsState';
import { dropAnimationConfig } from './dropAnimationConfig';
import { SortableItem } from './SortableItem';


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
    <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
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

const adjustTranslate: Modifier = ({ transform }) => {
  return {
    ...transform,
    y: transform.y - 25,
  };
};

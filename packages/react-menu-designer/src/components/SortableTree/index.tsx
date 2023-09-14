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


interface Props {
  indentationWidth?: number;
  indicator?: boolean;
}

export function SortableTree({
  indicator = true,
  indentationWidth = 50,
}: Props) {
  const [items, setItems] = useItemsState();
  const [activeId] = useActiveIdState();
  const [overId] = useOverIdState();
  const [offsetLeft] = useOffsetLeftState();

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(items);
    const collapsedItems = flattenedTree.reduce<UniqueIdentifier[]>(
      (acc, { children, collapsed, id }) =>
        collapsed && children.length ? [...acc, id] : acc,
      []
    );

    return removeChildrenOf(
      flattenedTree,
      activeId ? [activeId, ...collapsedItems] : collapsedItems
    );
  }, [activeId, items]);
  const projected =
    activeId && overId
      ? getProjection(
        flattenedItems,
        activeId,
        overId,
        offsetLeft,
        indentationWidth
      )
      : null;
  const sensorContext: SensorContext = useRef({
    items: flattenedItems,
    offset: offsetLeft,
  });

  const sortedIds = useMemo(() => flattenedItems.map(({ id }) => id), [
    flattenedItems,
  ]);

  const activeItem = activeId
    ? flattenedItems.find(({ id }) => id === activeId)
    : null;

  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft,
    };
  }, [flattenedItems, offsetLeft]);


  return (
    <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
      {flattenedItems.map(({ id, children, collapsed, depth }) => (
        <SortableTreeItem
          key={id}
          id={id}
          value={id as string}
          depth={id === activeId && projected ? projected.depth : depth}
          indentationWidth={indentationWidth}
          indicator={indicator}
          collapsed={Boolean(collapsed && children.length)}
          onCollapse={
            children.length
              ? () => handleCollapse(id)
              : undefined
          }
          onRemove={() => handleRemove(id)}
        />
      ))}
      {createPortal(
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
      )}
    </SortableContext>
  );

  function handleRemove(id: UniqueIdentifier) {
    setItems((items) => removeItem(items, id));
  }

  function handleCollapse(id: UniqueIdentifier) {
    setItems((items) =>
      setProperty(items, id, 'collapsed', (value) => {
        return !value;
      })
    );
  }

}

const adjustTranslate: Modifier = ({ transform }) => {
  return {
    ...transform,
    y: transform.y - 25,
  };
};

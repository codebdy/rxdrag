import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  DragOverlay,
  DropAnimation,
  Modifier,
  defaultDropAnimation,
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
import type { SensorContext, TreeItems } from '../../types';
import { SortableTreeItem } from '..';
import { CSS } from '@dnd-kit/utilities';
import { useActiveIdState } from '../../hooks/useActiveIdState';
import { useOverIdState } from '../../hooks/useOverIdState';
import { useOffsetLeftState } from '../../hooks/useOffsetLeftState';

const initialItems: TreeItems = [
  {
    id: 'Home',
    children: [],
  },
  {
    id: 'Collections',
    children: [
      { id: 'Spring', children: [] },
      { id: 'Summer', children: [] },
      { id: 'Fall', children: [] },
      { id: 'Winter', children: [] },
    ],
  },
  {
    id: 'About Us',
    children: [],
  },
  {
    id: 'My Account',
    children: [
      { id: 'Addresses', children: [] },
      { id: 'Order History', children: [] },
    ],
  },
];


const dropAnimationConfig: DropAnimation = {
  keyframes({ transform }) {
    return [
      { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
      {
        opacity: 0,
        transform: CSS.Transform.toString({
          ...transform.final,
          x: transform.final.x + 5,
          y: transform.final.y + 5,
        }),
      },
    ];
  },
  easing: 'ease-out',
  sideEffects({ active }) {
    active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: defaultDropAnimation.duration,
      easing: defaultDropAnimation.easing,
    });
  },
};

interface Props {
  defaultItems?: TreeItems;
  indentationWidth?: number;
  indicator?: boolean;
}

export function SortableTree({
  defaultItems = initialItems,
  indicator = true,
  indentationWidth = 50,
}: Props) {
  const [items, setItems] = useState(() => defaultItems);
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

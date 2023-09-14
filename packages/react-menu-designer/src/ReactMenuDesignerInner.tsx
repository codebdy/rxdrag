import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DndContext,
  closestCenter,
  DragStartEvent,
  DragMoveEvent,
  DragEndEvent,
  DragOverEvent,
  MeasuringStrategy,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  arrayMove,
} from '@dnd-kit/sortable';

import {
  buildTree,
  flattenTree,
  getProjection,
  removeChildrenOf,
} from './utilities';
import type { FlattenedItem, TreeItem, TreeItems } from './types';
import styled from 'styled-components';
import { Toolbox } from './components/Toolbox';
import { PropertyPanel } from './components/PropertyPanel';
import { Button, Divider, Space } from 'antd';
import { DeleteOutlined, RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { SortableTree } from './components/SortableTree';
import { MaterialsContext } from './contexts';
import { menuMaterials } from './materials';
import { useActiveIdState } from './hooks/useActiveIdState';
import { useOverIdState } from './hooks/useOverIdState';
import { useOffsetLeftState } from './hooks/useOffsetLeftState';
import { useItemsState } from './hooks/useItemsState';
import { IMenuItemMaterial } from './interfaces';
import { createId } from "@rxdrag/shared"

const Shell = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-flow: column;
  background-color: ${props => props.theme.token?.colorBorderSecondary};
  align-items: center;
  box-sizing: border-box;
  padding: 16px;
`

const CanvasContainer = styled.div`
  flex: 1;
  user-select: none;
  padding: 0;
  max-width: 600px;
  width: 500px;
  box-sizing: border-box;
  background-color: ${props => props.theme.token?.colorBgContainer};
  height: 0;
  display: flex;
  flex-flow: column;
  border-radius: 8px;
  overflow: hidden;
`

const Canvas = styled.div`
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
`

const Toolbar = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px ${props => props.theme.token?.colorBorder};
  flex-shrink: 0;
  padding: 0 16px;
  justify-content: space-between;
  background-color: ${props => props.theme.token?.colorBgBase};
`
const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

interface Props {
  defaultItems?: TreeItems;
  indentationWidth?: number;
  indicator?: boolean;
}

export const ReactMenuDesignerInner = memo(({
  indentationWidth = 50,
}: Props) => {
  const [newItem, setNewItem] = useState<TreeItem>()
  const [overOnCanvas, setOverOnCanvas] = useState<boolean>()
  const [items, setItems] = useItemsState();
  const [activeId, setActiveId] = useActiveIdState();
  const [overId, setOverId] = useOverIdState();
  const [offsetLeft, setOffsetLeft] = useOffsetLeftState();
  const canvasRef = useRef<HTMLDivElement>(null)

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

  const flattenedItemsRef = useRef(flattenedItems);
  flattenedItemsRef.current = flattenedItems;
  const itemsRef = useRef(items);
  itemsRef.current = items

  const projected = useMemo(
    () => activeId && overId
      ? getProjection(
        flattenedItems,
        activeId,
        overId,
        offsetLeft,
        indentationWidth
      )
      : null,
    [activeId, flattenedItems, indentationWidth, offsetLeft, overId]
  );

  //处理新拖入
  useEffect(() => {
    if (newItem && overOnCanvas && projected) {
      if (!flattenedItemsRef.current.find(item => item.id === newItem.id)) {
        const { depth, parentId } = projected;
        const clonedItems: FlattenedItem[] = JSON.parse(
          JSON.stringify(flattenTree(itemsRef.current))
        );
        const overIndex = clonedItems.findIndex(({ id }) => id === overId);

        clonedItems.splice(overIndex, 0, { ...newItem, index: overIndex, depth, parentId });

        const newItems = buildTree(clonedItems);

        setItems(newItems);
        console.log("===>handleDragOver", overId, projected)
      }
    }
  }, [newItem, overId, overOnCanvas, projected, setItems])

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e
    const material = active.data?.current?.material as IMenuItemMaterial | undefined
    console.log("===>handleDragStart",)
    if (material) {
      const id = createId()
      setNewItem({
        id: id,
        //title: material.resource?.title
        children: []
      })
      setActiveId(id);
      setOverId(id);
    } else {
      setActiveId(active.id);
      setOverId(active.id);
    }
    document.body.style.setProperty('cursor', 'grabbing');
  }

  const handleDragMove = useCallback((e: DragMoveEvent) => {
    const { delta } = e
    setOffsetLeft(delta.x);
  }, [setOffsetLeft])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!activeId) {
      return
    }
    const mouseEvent = e
    const rect = canvasRef.current?.getBoundingClientRect()
    //console.log("===>handleDragMove", mouseEvent.clientX, rect?.left,)
    if (rect) {
      if (mouseEvent.clientX > rect.left && mouseEvent.clientX < (rect.left + rect.width) &&
        mouseEvent.clientY > rect.top && mouseEvent.clientY < (rect.top + rect.height)
      ) {
        setOverOnCanvas(true)
        return
      }
    }
    setOverOnCanvas(false)
  }, [activeId])

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  const handleDragOver = useCallback((e: DragOverEvent) => {
    const { over } = e
    setOverId(over?.id ?? null);
  }, [setOverId])

  const resetState = useCallback(() => {
    setOverId(null);
    setActiveId(null);
    setOffsetLeft(0);
    setNewItem(undefined)
    setOverOnCanvas(false)
    document.body.style.setProperty('cursor', '');
  }, [setActiveId, setOffsetLeft, setOverId])

  const handleDragEnd = useCallback((e: DragEndEvent) => {
    const { active, over } = e
    resetState();
    //console.log("===>handleDragEnd", e)
    if (projected && over) {
      const { depth, parentId } = projected;
      const clonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree(items))
      );
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
      const activeTreeItem = clonedItems[activeIndex];

      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
      const newItems = buildTree(sortedItems);

      setItems(newItems);
    }
  }, [items, projected, resetState, setItems])

  const handleDragCancel = useCallback(() => {
    resetState();
  }, [resetState])

  return (
    <MaterialsContext.Provider value={menuMaterials}>
      <DndContext
        collisionDetection={closestCenter}
        measuring={measuring}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <Shell>
          <Toolbox ></Toolbox>
          <CanvasContainer>
            <Toolbar>
              <Space>
                <Button type="text" icon={<UndoOutlined />} />
                <Button type="text" icon={<RedoOutlined />} />
                <Divider type='vertical' />
                <Button type="text" icon={<DeleteOutlined />} />
              </Space>
              <Button type="primary" >保存</Button>
            </Toolbar>
            <Canvas ref={canvasRef}>
              <SortableTree isNewing={!!newItem?.id} />
            </Canvas>
          </CanvasContainer>
          <PropertyPanel></PropertyPanel>
        </Shell>
      </DndContext>
    </MaterialsContext.Provider>
  )
})


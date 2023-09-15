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
  useDroppable,
} from '@dnd-kit/core';

import {
  flattenTree,
  getProjection,
  removeChildrenOf,
} from './utilities';
import styled from 'styled-components';
import { Toolbox } from './components/Toolbox';
import { PropertyPanel } from './components/PropertyPanel';
import { Button, Divider, Space } from 'antd';
import { DeleteOutlined, RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { SortableTree } from './components/SortableTree';
import { ResourcesContext } from './contexts';
import { useActiveIdState } from './hooks/useActiveIdState';
import { useOverIdState } from './hooks/useOverIdState';
import { useOffsetLeftState } from './hooks/useOffsetLeftState';
import { useItemsState } from './hooks/useItemsState';
import { IMenuItem, IMenuItemResource } from './interfaces';
import { IFlattenedItem } from './interfaces/flattened';
import { menuResources } from './resources';
import { useResourceItemsState } from './hooks/useResourceItemsState';
import { useGetResourceItem } from './hooks/useGetResourceItem';
import { useGetResource } from './hooks/useGetResource';

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

const DropContainer = styled.div`
  width: 100%;
  min-height: 100%;
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


export type ReactMenuDesignerInnerProps = {
  indentationWidth?: number;
  indicator?: boolean;
}

export const ReactMenuDesignerInner = memo(({
  indentationWidth = 50,
}: ReactMenuDesignerInnerProps) => {
  //const [newItem, setNewItem] = useState<IMenuItem>()
  const [overOnCanvas, setOverOnCanvas] = useState<boolean>()
  const [items, setItems] = useItemsState();
  const [resourceItems, setResourceItems] = useResourceItemsState();
  const [activeId, setActiveId] = useActiveIdState();
  const [overId, setOverId] = useOverIdState();
  const [offsetLeft, setOffsetLeft] = useOffsetLeftState();
  const canvasRef = useRef<HTMLDivElement>(null)
  const { setNodeRef } = useDroppable({
    id: "canvas"
  });

  const getResourceItem = useGetResourceItem();
  const getResource = useGetResource()
  // const flattenedItems = useMemo(() => {
  //   const flattenedTree = flattenTree(items);
  //   const collapsedItems = flattenedTree.reduce<UniqueIdentifier[]>(
  //     (acc, { children, collapsed, id }) =>
  //       collapsed && children.length ? [...acc, id] : acc,
  //     []
  //   );

  //   return removeChildrenOf(
  //     flattenedTree,
  //     activeId ? [activeId, ...collapsedItems] : collapsedItems
  //   );
  // }, [activeId, items]);

  // const flattenedItemsRef = useRef(flattenedItems);
  // flattenedItemsRef.current = flattenedItems;
  // const itemsRef = useRef(items);
  // itemsRef.current = items

  // const projected = useMemo(
  //   () => activeId && overId
  //     ? getProjection(
  //       flattenedItems,
  //       activeId,
  //       overId,
  //       offsetLeft,
  //       indentationWidth
  //     )
  //     : null,
  //   [activeId, flattenedItems, indentationWidth, offsetLeft, overId]
  // );

  // const projectedRef = useRef(projected)
  // projectedRef.current = projected

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e
    setActiveId(active.id);
    setOverId(active.id);
    document.body.style.setProperty('cursor', 'grabbing');
  }

  const handleDragMove = useCallback((e: DragMoveEvent) => {
    const { delta } = e
    setOffsetLeft(delta.x);
    const resourceItem = getResourceItem(activeId)
    if (resourceItem) {
      setItems(items => !items.find(item => item.id === resourceItem.id) ? [...items, resourceItem] : items)
    }

    // if (draggingResource) {
    //   const tempNode: IFlattenedItem = {
    //     id: draggingResource.type,
    //     parentId: null,
    //     depth: 0,
    //     //resource: draggingResource,
    //   }

    //   if (!items.find(item => item.id === tempNode.id)) {
    //     setItems([...items, tempNode])
    //   }
    // }
    // if (newItem && overOnCanvas) {
    //   setOffsetLeft(0)
    //   console.log("===>useEffect projected", overId)
    //   if (newItem.id === overId || !overId) {
    //     console.log("over在新建节点上")
    //     return
    //   }
    //   //const { depth, parentId } = projected;
    //   let clonedItems: FlattenedItem[] = JSON.parse(
    //     JSON.stringify(flattenTree(itemsRef.current))
    //   );
    //   clonedItems = clonedItems.filter(item => item.id !== newItem.id)
    //   const overIndex = clonedItems.findIndex(({ id }) => id === overId);
    //   clonedItems.splice(overIndex, 0, { ...newItem, index: overIndex, depth: 0, parentId: null });

    //   const newItems = buildTree(clonedItems);

    //   setItems(newItems);
    // }
  }, [activeId, getResourceItem, setItems, setOffsetLeft])

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
    //setDraggingResoucre(undefined)
    setOverOnCanvas(false)
    document.body.style.setProperty('cursor', '');
  }, [setActiveId, setOffsetLeft, setOverId])

  const handleDragEnd = useCallback((e: DragEndEvent) => {
    const { active, over } = e
    const resourceItem = getResourceItem(active.id)
    const resource = getResource(resourceItem)
    if (resource) {
      const newResourceItem: IFlattenedItem = { ...resource.createMenuItem(), children: undefined }
      setResourceItems(items => items.map(item => item.id === activeId ? newResourceItem : item))
    }

    resetState();
    // const newItems = items.map(item => {
    //   if (item.resource) {
    //     const menuItem = item.resource.createMenuItem()
    //     return {
    //       id: menuItem.id,
    //       menuItem: menuItem,
    //       depth: 0,
    //       parentId: null,
    //     }
    //   }
    //   return item
    // })
    // setItems(newItems)
    //console.log("===>handleDragEnd", e)
    // if (projected && over) {
    //   const { depth, parentId } = projected;
    //   const clonedItems: FlattenedItem[] = JSON.parse(
    //     JSON.stringify(flattenTree(items))
    //   );
    //   const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
    //   const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
    //   const activeTreeItem = clonedItems[activeIndex];

    //   clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

    //   const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
    //   const newItems = buildTree(sortedItems);

    //   setItems(newItems);
    // }

  }, [activeId, getResource, getResourceItem, resetState, setResourceItems])

  const handleDragCancel = useCallback(() => {
    // const newItems = items.filter(item => item.resource)
    // setItems(newItems)
    resetState();
  }, [resetState])

  return (

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
            <DropContainer ref={setNodeRef}>
              <SortableTree />
            </DropContainer>
            {/* <Test /> */}
          </Canvas>
        </CanvasContainer>
        <PropertyPanel></PropertyPanel>
      </Shell>
    </DndContext>
  )
})


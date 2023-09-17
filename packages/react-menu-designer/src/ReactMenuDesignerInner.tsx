import { memo, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { Toolbox } from './components/Toolbox';
import { PropertyPanel } from './components/PropertyPanel';
import { Button, Divider, Space } from 'antd';
import { DeleteOutlined, RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { useActiveIdState } from './hooks/useActiveIdState';
import { useOverIdState } from './hooks/useOverIdState';
import { useOffsetLeftState } from './hooks/useOffsetLeftState';
import { useItemsState } from './hooks/useItemsState';
import { useGetResource } from './hooks/useGetResource';
import { DndContext } from './dnd/DndContext';
import { Droppable } from './dnd';
import { CANVS_ID } from './consts';
import classNames from 'classnames';

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
  border-radius: 4px;
  overflow: hidden;
`

const Canvas = styled.div`
  width: 100%;
  flex: 1;
  overflow: auto;
  box-sizing: border-box;
`

const DropContainer = styled.div`
  min-height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-flow: column;
  padding: 4px 8px;
  user-select: none;
  box-sizing: border-box;
  &.over{
    background-color: red;
  }
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

export type ReactMenuDesignerInnerProps = {
  indentationWidth?: number;
  indicator?: boolean;
}

const defaultAnnouncements = {
  onDragStart(id: string) {
    console.log(`Picked up draggable item ${id}.`);
  },
  onDragOver(id: string, overId: string) {
    if (overId) {
      console.log(
        `Draggable item ${id} was moved over droppable area ${overId}.`
      );
      return;
    }

    console.log(`Draggable item ${id} is no longer over a droppable area.`);
  },
  onDragEnd(id: string, overId: string) {
    if (overId) {
      console.log(
        `Draggable item ${id} was dropped over droppable area ${overId}`
      );
      return;
    }

    console.log(`Draggable item ${id} was dropped.`);
  },
  onDragCancel(id: string) {
    console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
  }
};
export const ReactMenuDesignerInner = memo(({
  indentationWidth = 50,
}: ReactMenuDesignerInnerProps) => {
  //const [newItem, setNewItem] = useState<IMenuItem>()
  const [overOnCanvas, setOverOnCanvas] = useState<boolean>()
  const [items, setItems] = useItemsState();
  const [activeId, setActiveId] = useActiveIdState();
  const [overId, setOverId] = useOverIdState();
  const [offsetLeft, setOffsetLeft] = useOffsetLeftState();
  const canvasRef = useRef<HTMLDivElement>(null)
  // const { setNodeRef } = useDroppable({
  //   id: CANVS_ID
  // });

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

  const resetState = useCallback(() => {
    setOverId(null);
    setActiveId(null);
    setOffsetLeft(0);
    //setDraggingResoucre(undefined)
    setOverOnCanvas(false)
    document.body.style.setProperty('cursor', '');
  }, [setActiveId, setOffsetLeft, setOverId])

  const handleDragCancel = useCallback(() => {
    // const newItems = items.filter(item => item.resource)
    // setItems(newItems)
    resetState();
  }, [resetState])

  return (

    <DndContext
      // onDragStart={handleDragStart}
      // onDragMove={handleDragMove}
      // onDragOver={handleDragOver}
      // onDragEnd={handleDragEnd}
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
          <Canvas ref={canvasRef} className='menu-canvas'>
            <Droppable droppableId={CANVS_ID}>
              {
                (innerRef, snapshot) => {
                  return (
                    <DropContainer ref={innerRef} className={classNames('menu-drop-container', { over: snapshot?.isDraggingOver })}>
                    </DropContainer>
                  )
                }
              }
            </Droppable>

          </Canvas>
        </CanvasContainer>
        <PropertyPanel></PropertyPanel>
      </Shell>
    </DndContext>
  )
})


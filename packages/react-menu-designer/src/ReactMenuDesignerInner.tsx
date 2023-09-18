import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { Toolbox } from './components/Toolbox';
import { PropertyPanel } from './components/PropertyPanel';
import { Button, Divider, Space } from 'antd';
import { DeleteOutlined, RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { useOffsetLeftState } from './hooks/useOffsetLeftState';
import { useItemsState } from './hooks/useItemsState';
import { useGetResource } from './hooks/useGetResource';
import { DndContext } from './dnd/DndContext';
import { DropEvent } from './dnd';
import { CANVS_ID } from './consts';
import { SortableTree } from './components/SortableTree';
import { IFlattenedItem } from './interfaces/flattened';
import { useGetItem } from './hooks/useGetItem';
import { useGetDepth } from './hooks/useGetDepth';

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

export const ReactMenuDesignerInner = memo(({
  indentationWidth = 50,
}: ReactMenuDesignerInnerProps) => {
  //const [newItem, setNewItem] = useState<IMenuItem>()
  const [items, setItems] = useItemsState();
  const getDepth = useGetDepth()

  const getResource = useGetResource()
  const getItem = useGetItem()
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
    document.body.style.setProperty('cursor', '');
  }, [])

  const handleDragCancel = useCallback(() => {
    // const newItems = items.filter(item => item.resource)
    // setItems(newItems)
    resetState();
  }, [resetState])

  const handleDrop = useCallback((e: DropEvent) => {
    if (e.activeId && e.droppableId === CANVS_ID) {
      const resouce = getResource(e.activeId)
      const activeItem = resouce ? resouce.createMenuItem() : getItem(e.activeId)
      if (!activeItem) {
        return
      }
      setItems((items) => {
        const newItems: IFlattenedItem[] = items.filter(item => item.id !== e.activeId);
        const index = e.afterId ? newItems.findIndex(item => item.id === e.afterId) + 1 : 0;
        const depth = getDepth(e.afterId, e.delta, indentationWidth)
        newItems.splice(index, 0, { ...activeItem, children: undefined, depth })
        return newItems
      })
    }
  }, [getDepth, getItem, getResource, indentationWidth, setItems])

  return (

    <DndContext
      onDrop={handleDrop}
      // onDragStart={handleDragStart}
      // onDragMove={handleDragMove}
      // onDragOver={handleDragOver}
      // onDragEnd={handleDragEnd}
      onDragEnd={handleDragCancel}
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

          <SortableTree items={items} indentationWidth={indentationWidth} />

        </CanvasContainer>
        <PropertyPanel></PropertyPanel>
      </Shell>
    </DndContext>
  )
})


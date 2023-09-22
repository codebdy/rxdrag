import { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Toolbox } from './components/Toolbox';
import { PropertyPanel } from './components/PropertyPanel';
import { Button, Divider, Space } from 'antd';
import { DeleteOutlined, RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { useGetResource } from './hooks/useGetResource';
import { DndContext } from './dnd/DndContext';
import { DragOverEvent, DropEvent } from './dnd';
import { CANVS_ID } from './consts';
import { SortableTree } from './components/SortableTree';
import { useGetItem } from './hooks/useGetItem';
import { IMenuItem } from './interfaces';
import { useBuildMenuSchema } from './hooks/useBuildMenuSchema';
import { useHistoryState } from './hooks/useHistoryState';
import { useMenuSchemaState } from './hooks/useMenuSchemaState';
import { IMenuItemSchema, IMenuSchema } from './interfaces/schema';
import { useGetItemPosition } from './hooks/useGetItemPosition';
import { useGetDropTarget } from './hooks/useGetDropTarget';
import { useMoveItem } from './hooks/useMoveItem';
import { useRemoveItem } from './hooks/useRemoveItem';
import { useBackup } from './hooks/useBackup';
import { useUndo } from './hooks/useUndo';
import { useRedo } from './hooks/useRedo';
import { useTranslate } from '@rxdrag/react-locales';
import { useExtractMenuItems } from './hooks/useExtractMenuItems';
import { ID } from '@rxdrag/shared';

const Shell = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-flow: column;
  background-color: ${props => props.theme.token?.colorBorderSecondary};
  align-items: center;
  box-sizing: border-box;
  padding: 16px;
  height: 100%;
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

const Canvas = styled.div`
  flex: 1;
  height: 0;
  overflow: auto;
`

const Title = styled.span`
  color: ${props => props.theme.token?.colorTextSecondary};
`

export type ReactMenuDesignerInnerProps = {
  defaultValue?: IMenuItem[],
  value?: IMenuItem[],
  indentationWidth?: number,
  toolbox?: React.ReactNode,
  name?: string,
  onSave?: (value: IMenuItem[]) => boolean | Promise<boolean> | void
}

export const ReactMenuDesignerInner = memo((props: ReactMenuDesignerInnerProps) => {
  const { defaultValue, value, indentationWidth = 50, toolbox, name, onSave } = props;
  const buildSchema = useBuildMenuSchema()
  const [history, setHistory] = useHistoryState()
  const [menuSchema, setMenuSchema] = useMenuSchemaState()
  const [oldSchema, setOldSchema] = useState<IMenuSchema | null>(null)
  const [tempItem, setTempItem] = useState<IMenuItemSchema | null>(null)
  const [draggingId, setDraggingId] = useState<ID | null>(null)
  const [selectedId, setSelectedId] = useState<ID>()
  const t = useTranslate()

  const getItemPosition = useGetItemPosition()
  const getTargetPosition = useGetDropTarget(indentationWidth)
  const moveItem = useMoveItem()
  const remove = useRemoveItem()
  const backup = useBackup()
  const undo = useUndo()
  const redo = useRedo()
  const extractMenuItems = useExtractMenuItems()

  const getResource = useGetResource()
  const getItem = useGetItem()

  useEffect(() => {
    if (defaultValue) {
      buildSchema(defaultValue)
      setHistory({
        changed: false,
        undoList: [],
        redoList: [],
      })
    }
  }, [buildSchema, defaultValue, setHistory])

  useEffect(() => {
    buildSchema(value || [])
  }, [buildSchema, value])

  const resetState = useCallback(() => {
    setOldSchema(null)
    setTempItem(null)
    setDraggingId(null)

    document.body.style.setProperty('cursor', '');
  }, [])

  const handleDragEnd = useCallback(() => {
    resetState();
  }, [resetState])

  const handleDragStart = useCallback((id: ID) => {
    setOldSchema(menuSchema)
    setDraggingId(id)
    const item = getItem(id)
    if (item) {
      setSelectedId(id)
    } else {
      setSelectedId(undefined)
    }
  }, [getItem, menuSchema])

  const handleDragOver = useCallback((e: DragOverEvent) => {
    const resouce = getResource(e.activeId)
    let tmpItem = tempItem
    if (e.droppableOver?.id === CANVS_ID) {
      if (resouce && !tempItem) {
        const newItemSchema: IMenuItemSchema = {
          meta: resouce.createMenuItem()
        }
        setTempItem(newItemSchema)
        tmpItem = newItemSchema
      }
      const activeItem = resouce ? tmpItem : getItem(e.activeId)
      if (activeItem && e.indicator) {
        const oldPostion = getItemPosition(activeItem.meta.id)
        const newPosition = getTargetPosition(e.indicator)
        if (newPosition && (newPosition?.position !== oldPostion?.position || newPosition?.targetId !== oldPostion?.targetId)) {
          moveItem(activeItem, newPosition)
        }
      }
    } else {
      if (resouce) {
        remove(tmpItem?.meta.id)
      }
    }

  }, [getItem, getItemPosition, getResource, getTargetPosition, moveItem, remove, tempItem])

  const handleDragCancel = useCallback(() => {
    if (oldSchema) {
      setMenuSchema(oldSchema)
    }
  }, [oldSchema, setMenuSchema])

  const handleDrop = useCallback((e: DropEvent) => {
    if (e.activeId && e.droppableId === CANVS_ID) {
      const activeItem = tempItem || getItem(e.activeId)
      if (!activeItem) {
        return
      }
      if (oldSchema) {
        backup(oldSchema)
      }
      setSelectedId(activeItem.meta.id)
    }
  }, [backup, getItem, oldSchema, tempItem])

  const handleSelect = useCallback((id?: ID) => {
    setSelectedId(id)
  }, [])

  const handleRemove = useCallback(() => {
    remove(selectedId)
    setSelectedId(undefined)
  }, [remove, selectedId])

  const handleUndo = useCallback(() => {
    undo()
    setSelectedId(undefined)
  }, [undo])

  const handleRedo = useCallback(() => {
    redo()
    setSelectedId(undefined)
  }, [redo])

  const handleSave = useCallback(() => {
    const menuItems = extractMenuItems()
    const result = onSave?.(menuItems)
    if (isPromise(result)) {
      (result as Promise<boolean>).then((val) => {
        if (val) {
          setHistory((history) => ({ ...history, changed: false }))
        }
      })
    } else if (result) {
      setHistory((history) => ({ ...history, changed: false }))
    }
  }, [extractMenuItems, onSave, setHistory])

  return (

    <DndContext
      onDrop={handleDrop}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <Shell className='menu-designer-shell'>
        <Toolbox >{toolbox}</Toolbox>
        <CanvasContainer>
          <Toolbar>
            <Space>
              <Button
                type="text"
                icon={<UndoOutlined />}
                disabled={!history.undoList.length}
                onClick={handleUndo}
              />
              <Button
                type="text"
                icon={<RedoOutlined />}
                disabled={!history.redoList.length}
                onClick={handleRedo}
              />
              <Divider type='vertical' />
              <Button
                type="text"
                disabled={!selectedId}
                icon={<DeleteOutlined />}
                onClick={handleRemove}
              />
            </Space>
            <Title>{name}</Title>
            <Button
              type="primary"
              disabled={!history.changed}
              onClick={handleSave}
            >
              {t("save")}
            </Button>
          </Toolbar>
          <Canvas>
            <SortableTree
              indentationWidth={indentationWidth}
              tempId={tempItem?.meta.id}
              draggingId={draggingId || undefined}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          </Canvas>
        </CanvasContainer>
        <PropertyPanel
          selectedId={selectedId}
        ></PropertyPanel>
      </Shell>
    </DndContext>
  )
})


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isPromise(obj: any) {
  return !!obj
    && (typeof obj === 'object' || typeof obj === 'function')
    && typeof obj.then === 'function';
}

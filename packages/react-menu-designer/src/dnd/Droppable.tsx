import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { DroppableGhostFn, DroppableChildrenFn, IDroppableStateSnapshot, Identifier, ChildItem } from "./types"
import { DroppableContext, DroppableParams, defualtDroppableParams } from "../contexts";
import { DROPPABLE_ATTR_ID_NAME } from "./consts";
import { useDndSnapshot } from "./hooks/useDndSnapshot";
import styled from "styled-components";
import { useTargetIndexState } from "./hooks/useTargetIndexState";
import { ChildItemsContext } from "./contexts";

const PlaceHolder = styled.div`
  position: fixed;
`

//export type Direction = 'horizontal' | 'vertical';

export type CheckOptions = {
  droppableId: Identifier,
  targetIndex: number,
  draggingId: Identifier,
}

export type DroppableProps = {
  droppableId: Identifier,
  dropDisabled?: boolean,
  //direction?: Direction,
  children?: DroppableChildrenFn,
  //目标位置的占位符
  renderGhost?: DroppableGhostFn
  //检查某个位置是否可以被插入
  canDrop?: (options: CheckOptions) => boolean
}

export const Droppable = memo((props: DroppableProps) => {
  const { droppableId, children, renderGhost: renderPlaceholder, canDrop } = props
  const childItemsState = useState<ChildItem[]>([])
  const droppableState = useState<DroppableParams>(defualtDroppableParams)
  const dndSnapshot = useDndSnapshot()
  const [ghostElement, getGhostElement] = useState<HTMLElement>()
  const [element, setElement] = useState<HTMLElement>()
  const [targetIndex, setTargetIndex] = useTargetIndexState() || []
  const [items] = childItemsState;

  const handleRefChange = useCallback((element?: HTMLElement | null) => {
    element?.setAttribute(DROPPABLE_ATTR_ID_NAME, droppableId)
    setElement(element || undefined)
  }, [droppableId])

  const handleGhostRefChange = useCallback((element?: HTMLElement | null) => {
    element?.style.setProperty("pointer-events", "none");
    element?.style.setProperty("position", "fixed");
    getGhostElement(element || undefined)
  }, [])

  const isDraggingOver = useMemo(() => dndSnapshot.overDroppable?.id === droppableId, [dndSnapshot.overDroppable?.id, droppableId])

  const snapshot: IDroppableStateSnapshot = useMemo(() => {
    return {
      isDraggingOver: isDraggingOver,
      over: {
        ...dndSnapshot.overDroppable,
        targetIndex: targetIndex,
      }
    }
  }, [dndSnapshot.overDroppable, isDraggingOver, targetIndex])

  //鼠标移开，清空targetIndex
  useEffect(() => {
    if (!isDraggingOver) {
      setTargetIndex?.(-1)
    }
  }, [isDraggingOver, setTargetIndex])

  //计算插入的位置
  useEffect(() => {
    if (isDraggingOver) {
      let index = 0
      //如果悬停在一个子元素
      const item = items.find(item => item.id === dndSnapshot.overDraggable?.id)
      if (dndSnapshot.overDraggable && item) {
        if ((dndSnapshot.overDraggable.offsetYPercent || 0) <= 0.5) {
          index = item.index
        } else {
          index = item.index + 1
        }
      }
      setTargetIndex?.(index)
    }
  }, [dndSnapshot.overDraggable, isDraggingOver, items, setTargetIndex])

  //控制Ghost初始位置
  useEffect(() => {
    if (ghostElement) {
      if (snapshot.isDraggingOver) {
        const rect = element?.getBoundingClientRect()
        ghostElement.style.setProperty("top", rect?.top + "px")
        ghostElement.style.setProperty("left", rect?.left + "px")
        ghostElement.style.setProperty("width", rect?.width + "px")
      }
    }
  }, [element, ghostElement, snapshot.isDraggingOver])

  //控制Ghost的显示跟隐藏
  useEffect(() => {
    if (ghostElement && !snapshot.isDraggingOver) {
      const display = ghostElement.style.getPropertyValue("display")
      ghostElement.style.setProperty("display", "none")
      return () => {
        if (display) {
          ghostElement.style.setProperty("display", display)
        } else {
          ghostElement.style.removeProperty("display")
        }
      }
    }
  }, [ghostElement, snapshot.isDraggingOver])

  return (
    <DroppableContext.Provider value={droppableState}>
      <ChildItemsContext.Provider value={childItemsState}>
        {children && children(handleRefChange, snapshot)}
        <PlaceHolder>
          {renderPlaceholder && renderPlaceholder(handleGhostRefChange, dndSnapshot.draggingId)}
        </PlaceHolder>
      </ChildItemsContext.Provider>
    </DroppableContext.Provider>
  )
})
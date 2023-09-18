import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { DroppableGhostFn, DroppableChildrenFn, IDroppableStateSnapshot, Identifier, ChildItem } from "./types"
import { DroppableContext, DroppableParams, defualtDroppableParams } from "../contexts";
import { DROPPABLE_ATTR_ID_NAME } from "./consts";
import { useDndSnapshot } from "./hooks/useDndSnapshot";
import styled from "styled-components";
import { useTargetIndexState } from "./hooks/useTargetIndexState";
import { ChildItemsContext } from "./contexts";
import { useGetItemElement } from "./hooks/useGetItemElement";
import { useGetItemCenterPoint } from "./hooks/getItemElement";

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
  const [afterId, setAfterId] = useState<Identifier>()
  const [items] = childItemsState;

  const getItemElement = useGetItemElement(element)
  const getCenrerPoint = useGetItemCenterPoint(element)

  //所有显示的条目，不包含被拖动的条目
  const showingItems = useMemo(() => items.filter(item => item.id !== dndSnapshot.draggingId), [dndSnapshot.draggingId, items]);

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
      originalEvent: dndSnapshot.overDroppable?.originalEvent,
      afterId: afterId,
    }
  }, [afterId, dndSnapshot.overDroppable?.originalEvent, isDraggingOver])

  //鼠标移开，清空targetIndex
  useEffect(() => {
    if (!isDraggingOver) {
      setTargetIndex?.(-1)
    }
  }, [isDraggingOver, setTargetIndex])

  //计算插入的位置
  useEffect(() => {
    if (dndSnapshot.overDroppable) {
      //let index = 0
      let afterId: string | undefined = undefined
      for (let i = 0; i < showingItems.length; i++) {
        const item = showingItems[i]
        const centerPoint = getCenrerPoint(item.id)
        if (centerPoint) {
          if (centerPoint.y >= dndSnapshot.overDroppable.originalEvent.clientY) {
            if (i > 0) {
              afterId = showingItems[i - 1].id
            }
            break;
          }
        }
      }
      if (!afterId && showingItems.length > 0) {
        const lastItem = showingItems[showingItems.length - 1]
        const lastCenterPoint = getCenrerPoint(lastItem.id)
        if (lastCenterPoint && dndSnapshot.overDroppable.originalEvent.clientY > lastCenterPoint?.y) {
          afterId = lastItem.id
        }
      }
      setAfterId(afterId)
    }
  }, [dndSnapshot.overDroppable, getCenrerPoint, showingItems])

  //控制Ghost位置
  useEffect(() => {
    if (ghostElement) {
      if (snapshot.isDraggingOver) {
        const rect = element?.getBoundingClientRect()
        ghostElement.style.setProperty("width", rect?.width + "px")
        ghostElement.style.setProperty("left", rect?.left + "px")

        if (afterId) {
          const topRect = getItemElement(afterId)?.getBoundingClientRect()
          ghostElement.style.setProperty("top", ((topRect?.top || 0) + (topRect?.height || 0)) + "px")
        } else {
          ghostElement.style.setProperty("top", rect?.top + "px")

        }
      }
    }
  }, [afterId, element, getItemElement, ghostElement, items, snapshot.isDraggingOver])

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

  //处理偏移
  useEffect(() => {
    if (isDraggingOver) {
      let beginOffset = !afterId;
      for (let i = 0; i < showingItems.length; i++) {
        const item = showingItems[i]
        if (beginOffset) {
          const itemElement = getItemElement(item.id)
          itemElement?.style.setProperty("transform", `translateY(${20}px)`)
          itemElement?.style.setProperty("transition", `transform 0.2s`)
        }

        if (item.id === afterId) {
          beginOffset = true
        }
      }

      return () => {
        for (let i = 0; i < showingItems.length; i++) {
          const item = showingItems[i]
          const itemElement = getItemElement(item.id)
          itemElement?.style.removeProperty("transform")
        }
      }
    }
  }, [afterId, getItemElement, isDraggingOver, showingItems])

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
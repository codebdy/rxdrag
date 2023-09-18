import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { DroppableGhostFn, DroppableChildrenFn, IDroppableStateSnapshot, Identifier, ChildItem } from "./types"
import { DroppableContext, DroppableParams, defualtDroppableParams } from "../contexts";
import { DROPPABLE_ATTR_ID_NAME } from "./consts";
import { useDndSnapshot } from "./hooks/useDndSnapshot";
import { useDrapIndicatorState } from "./hooks/useDrapIndicatorState";
import { ChildItemsContext } from "./contexts";
import { useGetItemElement } from "./hooks/useGetItemElement";
import { useGetItemCenterPoint } from "./hooks/getItemElement";

//export type Direction = 'horizontal' | 'vertical';

export type CheckOptions = {
  droppableId: Identifier,
  //undfined标识插入开始位置
  afterId?: Identifier,
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
  canDrop?: (options: CheckOptions) => boolean,
  placeholderOffset?: number,
}

export const Droppable = memo((props: DroppableProps) => {
  const { droppableId, children, renderGhost: renderPlaceholder, canDrop, placeholderOffset = 20 } = props
  const childItemsState = useState<ChildItem[]>([])
  const droppableState = useState<DroppableParams>(defualtDroppableParams)
  const dndSnapshot = useDndSnapshot()
  const [ghostElement, getGhostElement] = useState<HTMLElement>()
  const [element, setElement] = useState<HTMLElement>()
  const [dropIndicator, setDropIndicator] = useDrapIndicatorState() || []
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
    element?.style.setProperty("transition", `all 0.2s`)
    getGhostElement(element || undefined)
  }, [])

  const isDraggingOver = useMemo(() => dndSnapshot.overDroppable?.id === droppableId, [dndSnapshot.overDroppable?.id, droppableId])

  const snapshot: IDroppableStateSnapshot = useMemo(() => {
    return {
      isDraggingOver: isDraggingOver,
      originalEvent: dndSnapshot.overDroppable?.originalEvent,
      afterId: dropIndicator?.afterId,
      cannotDrop: dropIndicator?.cannotDrop,
    }
  }, [dndSnapshot.overDroppable?.originalEvent, dropIndicator?.afterId, dropIndicator?.cannotDrop, isDraggingOver])

  //鼠标移开，清空drop指示
  useEffect(() => {
    if (!isDraggingOver) {
      setDropIndicator?.(undefined)
    }
  }, [isDraggingOver, setDropIndicator])

  //计算插入的位置
  useEffect(() => {
    if (dndSnapshot.overDroppable && dndSnapshot.draggingId) {
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
      setDropIndicator?.(
        {
          afterId,
          cannotDrop: canDrop && !canDrop?.({
            droppableId,
            draggingId: dndSnapshot.draggingId,
            afterId,
          })
        }
      )
    }
  }, [canDrop, dndSnapshot.draggingId, dndSnapshot.overDroppable, droppableId, getCenrerPoint, setDropIndicator, showingItems])

  //控制Ghost位置
  useEffect(() => {
    if (ghostElement) {
      if (snapshot.isDraggingOver) {
        const rect = element?.getBoundingClientRect()
        ghostElement.style.setProperty("width", rect?.width + "px")
        ghostElement.style.setProperty("left", rect?.left + "px")

        if (dropIndicator?.afterId) {
          const topRect = getItemElement(dropIndicator.afterId)?.getBoundingClientRect()
          ghostElement.style.setProperty("top", ((topRect?.top || 0) + (topRect?.height || 0)) + "px")
        } else {
          ghostElement.style.setProperty("top", rect?.top + "px")
        }
      }
    }
  }, [dropIndicator?.afterId, element, getItemElement, ghostElement, items, snapshot.isDraggingOver])

  //控制Ghost的显示跟隐藏
  useEffect(() => {
    if (ghostElement && !isDraggingOver && (!dropIndicator || dropIndicator?.cannotDrop)) {
      //隐藏
      const display = ghostElement.style.getPropertyValue("display")
      ghostElement.style.setProperty("display", "none")
      return () => {
        //显示
        if (display) {
          ghostElement.style.setProperty("display", display)
        } else {
          ghostElement.style.removeProperty("display")
        }
      }
    }
  }, [dropIndicator, dropIndicator?.cannotDrop, ghostElement, isDraggingOver, snapshot.isDraggingOver])

  //处理偏移
  useEffect(() => {
    if (isDraggingOver) {
      let beginOffset = !dropIndicator?.afterId;
      for (let i = 0; i < showingItems.length; i++) {
        const item = showingItems[i]
        if (beginOffset) {
          const itemElement = getItemElement(item.id)
          itemElement?.style.setProperty("transform", `translateY(${placeholderOffset}px)`)
          itemElement?.style.setProperty("transition", `transform 0.2s`)
        }

        if (item.id === dropIndicator?.afterId) {
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
  }, [dropIndicator?.afterId, getItemElement, isDraggingOver, placeholderOffset, showingItems])

  return (
    <DroppableContext.Provider value={droppableState}>
      <ChildItemsContext.Provider value={childItemsState}>
        {children && children(handleRefChange, snapshot)}
        {renderPlaceholder && renderPlaceholder(handleGhostRefChange, dndSnapshot.draggingId)}
      </ChildItemsContext.Provider>
    </DroppableContext.Provider>
  )
})
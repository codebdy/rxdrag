import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { DroppableGhostFn, DroppableChildrenFn, IDroppableStateSnapshot, Identifier, ChildItem, Offset } from "./types"
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
  const { droppableId, children, renderGhost: ghostRender, canDrop, placeholderOffset = 20 } = props
  const childItemsState = useState<ChildItem[]>([])
  const droppableState = useState<DroppableParams>(defualtDroppableParams)
  const dndSnapshot = useDndSnapshot()
  const [ghostElement, getGhostElement] = useState<HTMLElement>()
  const [element, setElement] = useState<HTMLElement>()
  const [dropIndicator, setDropIndicator] = useDrapIndicatorState() || []
  const [items] = childItemsState;
  const renderGhostRef = useRef<() => void>()

  const getItemElement = useGetItemElement(element)
  const getCenrerPoint = useGetItemCenterPoint(element)

  //所有显示的条目，不包含被拖动的条目
  const showingItems = useMemo(() => items.filter(item => item.id !== dndSnapshot.draggingId), [dndSnapshot.draggingId, items]);

  const isDraggingOver = useMemo(() => dndSnapshot.overDroppable?.id === droppableId, [dndSnapshot.overDroppable?.id, droppableId])

  const handleScroll = useCallback(() => {
    if (isDraggingOver) {
      renderGhostRef.current?.()
    }
  }, [isDraggingOver])


  const handleRefChange = useCallback((element?: HTMLElement | null) => {
    element?.setAttribute(DROPPABLE_ATTR_ID_NAME, droppableId)
    setElement(element || undefined)
    element?.addEventListener("scroll", handleScroll)
  }, [droppableId, handleScroll])

  const handleGhostRefChange = useCallback((element?: HTMLElement | null) => {
    element?.style.setProperty("pointer-events", "none");
    element?.style.setProperty("position", "fixed");
    getGhostElement(element || undefined)
  }, [])


  const snapshot: IDroppableStateSnapshot = useMemo(() => {
    return {
      isDraggingOver: isDraggingOver,
      originalEvent: dndSnapshot.overDroppable?.originalEvent,
      afterId: dropIndicator?.afterId,
      cannotDrop: dropIndicator?.cannotDrop,
      delta: dropIndicator?.delta,
    }
  }, [dndSnapshot.overDroppable?.originalEvent, dropIndicator?.afterId, dropIndicator?.cannotDrop, dropIndicator?.delta, isDraggingOver])

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
          }),
          delta: {
            x: dndSnapshot.overDroppable.offsetX || 0,
            y: dndSnapshot.overDroppable.offsetY || 0,
          }
        }
      )
    }
  }, [canDrop, dndSnapshot.draggingId, dndSnapshot.overDroppable, droppableId, getCenrerPoint, setDropIndicator, showingItems])

  const doRenderGhost = useCallback(() => {
    const rect = element?.getBoundingClientRect()
    ghostElement?.style.setProperty("width", rect?.width + "px")
    ghostElement?.style.setProperty("left", rect?.left + "px")

    if (dropIndicator?.afterId) {
      const itemElement = getItemElement(dropIndicator.afterId)
      const topRect = itemElement?.getBoundingClientRect()
      if (itemElement) {
        const style = window.getComputedStyle(itemElement)
        const offset = style.transform === "none" ? 0 : -placeholderOffset
        ghostElement?.style.setProperty("top", ((topRect?.top || 0) + offset + (topRect?.height || 0)) + "px")
      }
    } else {
      ghostElement?.style.setProperty("top", rect?.top + "px")
    }
  }, [dropIndicator?.afterId, element, getItemElement, ghostElement?.style, placeholderOffset])

  renderGhostRef.current = doRenderGhost

  //控制Ghost位置
  useEffect(() => {
    if (snapshot.isDraggingOver) {
      doRenderGhost()
    }
  }, [doRenderGhost, snapshot.isDraggingOver])

  const ghostDisplay = useMemo(() => {
    if (isDraggingOver && dropIndicator && !dropIndicator.cannotDrop) {
      return true
    }
    return false
  }, [dropIndicator, isDraggingOver])

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

  const ghostSnapshot = useMemo(() => {
    return {
      draggingId: dndSnapshot.draggingId,
      delta: snapshot.delta,
    }
  }, [dndSnapshot.draggingId, snapshot.delta])

  return (
    <DroppableContext.Provider value={droppableState}>
      <ChildItemsContext.Provider value={childItemsState}>
        {children && children(handleRefChange, snapshot)}
        {ghostDisplay && ghostRender && ghostRender(handleGhostRefChange, ghostSnapshot)}
      </ChildItemsContext.Provider>
    </DroppableContext.Provider>
  )
})
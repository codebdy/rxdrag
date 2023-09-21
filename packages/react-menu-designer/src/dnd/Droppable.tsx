import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { DroppableChildrenFn, IDroppableStateSnapshot } from "./types"
import { DroppableContext, DroppableParams, defualtDroppableParams } from "../contexts";
import { DROPPABLE_ATTR_ID_NAME } from "./consts";
import { useDndSnapshot } from "./hooks/useDndSnapshot";
import { useDropIndicatorState } from "./hooks/useDropIndicatorState";
import { useGetItemCenterPoint } from "./hooks/getItemElement";
import { ID } from "@rxdrag/shared";

//export type Direction = 'horizontal' | 'vertical';

export type CheckOptions = {
  droppableId: ID,
  //undfined标识插入开始位置
  belowAtId?: ID,
  draggingId: ID,
}

export type DroppableProps = {
  droppableId: ID,
  dropDisabled?: boolean,
  //direction?: Direction,
  children?: DroppableChildrenFn,
  //参与位置计算的条目
  items: ID[]
}

export const Droppable = memo((props: DroppableProps) => {
  const { droppableId, children, items } = props
  const droppableState = useState<DroppableParams>(defualtDroppableParams)
  const dndSnapshot = useDndSnapshot()
  const [element, setElement] = useState<HTMLElement>()
  const [dropIndicator, setDropIndicator] = useDropIndicatorState() || []
  const renderGhostRef = useRef<() => void>()

  const getCenrerPoint = useGetItemCenterPoint(element)

  //所有显示的条目，不包含被拖动的条目
  const showingItems = useMemo(() => items.filter(item => item !== dndSnapshot.draggingId), [dndSnapshot.draggingId, items]);

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


  const snapshot: IDroppableStateSnapshot = useMemo(() => {
    return {
      isDraggingOver: isDraggingOver,
      originalEvent: dndSnapshot.overDroppable?.originalEvent,
      belowAtId: dropIndicator?.belowAtId,
      delta: dropIndicator?.delta,
    }
  }, [dndSnapshot.overDroppable?.originalEvent, dropIndicator?.belowAtId, dropIndicator?.delta, isDraggingOver])

  //计算插入的位置
  useEffect(() => {
    if (dndSnapshot.overDroppable && dndSnapshot.draggingId) {
      //let index = 0
      let belowAtId: string | undefined = undefined
      for (let i = 0; i < showingItems.length; i++) {
        const itemId = showingItems[i]
        const centerPoint = getCenrerPoint(itemId)
        if (centerPoint) {
          if (centerPoint.y >= dndSnapshot.overDroppable.originalEvent.clientY) {
            if (i > 0) {
              belowAtId = showingItems[i - 1]
            }
            break;
          }
        }
      }
      if (!belowAtId && showingItems.length > 0) {
        const lastItemId = showingItems[showingItems.length - 1]
        const lastCenterPoint = getCenrerPoint(lastItemId)
        if (lastCenterPoint && dndSnapshot.overDroppable.originalEvent.clientY > lastCenterPoint?.y) {
          belowAtId = lastItemId
        }
      }
      setDropIndicator?.(
        {
          belowAtId,
          delta: {
            x: dndSnapshot.overDroppable.offsetX || 0,
            y: dndSnapshot.overDroppable.offsetY || 0,
          }
        }
      )
    }
  }, [dndSnapshot.draggingId, dndSnapshot.overDroppable, droppableId, getCenrerPoint, setDropIndicator, showingItems])

  return (
    <DroppableContext.Provider value={droppableState}>
      {children && children(handleRefChange, snapshot)}
    </DroppableContext.Provider>
  )
})
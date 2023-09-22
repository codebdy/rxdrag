import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { DropEvent, DropIndicator, IDndSnapshot, Offset, DroppableOverInfo, DragOverEvent } from "./types";
import { ID, getRecentRxElement } from "@rxdrag/shared";
import { DRAGGABLE_ATTR_ID_NAME, DRAGGABLE_HNADLER_ATTR_ID_NAME, DROPPABLE_ATTR_ID_NAME } from "./consts";
import { DndSnapshotContext, DropIndicatorContext } from "./contexts";

export type DndContextProps = {
  onDragStart?: (id: ID) => void,
  onDragOver?: (e: DragOverEvent) => void,
  onDrop?: (e: DropEvent) => void,
  onDragEnd?: () => void,
  onDragCancel?: () => void,
  children?: React.ReactNode
}

export const DndContext = memo((
  props: DndContextProps
) => {
  const { onDragStart, onDragOver, onDrop, onDragEnd, onDragCancel, children } = props;
  const [mouseDownEvent, setMouseDownEvent] = useState<MouseEvent>();
  const [startRect, setStartRect] = useState<DOMRect>();
  const [activeId, setActiveId] = useState<ID>();
  const [dragging, setDragging] = useState<boolean>()
  const [draggingOffset, setDraggingOffset] = useState<Offset>()
  const [overDroppable, setOverDroppable] = useState<DroppableOverInfo>()
  const dropIndicatorState = useState<DropIndicator>()
  const [dropIndicator, setDropIndeicator] = dropIndicatorState

  const mouseDownEventRef = useRef(mouseDownEvent)
  mouseDownEventRef.current = mouseDownEvent

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (e.target) {
      const draggedElement = getRecentRxElement(e.target as HTMLElement, DRAGGABLE_HNADLER_ATTR_ID_NAME)
      const realElement = getRecentRxElement(e.target as HTMLElement, DRAGGABLE_ATTR_ID_NAME)
      if (draggedElement) {
        setMouseDownEvent(e)
        setActiveId(draggedElement.getAttribute(DRAGGABLE_HNADLER_ATTR_ID_NAME) || undefined)
        setStartRect(realElement?.getBoundingClientRect())
      }
    }
  }, [])

  const getOverInfo = useCallback((attrName: string, e: MouseEvent) => {
    const recentElement = getRecentRxElement(e.target as HTMLElement, attrName)
    if (recentElement) {
      const draggableRect = recentElement.getBoundingClientRect()
      const offsetX = e.clientX - draggableRect.left
      const offsetY = e.clientY - draggableRect.top
      const over: DroppableOverInfo = {
        id: recentElement.getAttribute(attrName) || undefined,
        offsetX: offsetX,
        offsetY: offsetY,
        originalEvent: e,
      }
      return over
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const startEvent = mouseDownEventRef.current
    if (startEvent) {
      const droppableOver: DroppableOverInfo | undefined = getOverInfo(DROPPABLE_ATTR_ID_NAME, e)
      setOverDroppable(droppableOver)
      if (Math.abs(e.screenX - startEvent.screenX) > 5 ||
        Math.abs(e.screenY - startEvent.screenY) > 5) {
        setDragging(true)
        if (!dragging && activeId) {
          onDragStart?.(activeId)
        }
        const offset = { x: 0, y: 0 }
        offset.x = e.clientX - startEvent.clientX
        offset.y = e.clientY - startEvent.clientY
        setDraggingOffset(offset)
      }

      activeId && onDragOver?.({
        activeId,
        originalEvent: e,
        droppableOver,
        indicator: dropIndicator,
      })
    }
  }, [activeId, dragging, dropIndicator, getOverInfo, onDragOver, onDragStart])

  const resetState = useCallback(() => {
    setOverDroppable(undefined)
    setDragging(false)
    setDraggingOffset(undefined)
    setMouseDownEvent(undefined)
    setStartRect(undefined)
    setActiveId(undefined)
    setDropIndeicator(undefined)
  }, [setActiveId, setDropIndeicator])

  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (overDroppable?.id && activeId && dropIndicator !== undefined) {
      onDrop?.({
        activeId: activeId,
        originalEvent: e,
        droppableId: overDroppable.id,
        indicator: dropIndicator,
      })
    } else {
      onDragCancel?.()
    }
    resetState()
    onDragEnd?.()
  }, [activeId, dropIndicator, onDragCancel, onDragEnd, onDrop, overDroppable?.id, resetState])

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  }, [handleMouseDown, handleMouseMove, handleMouseUp])

  const snapshot: IDndSnapshot = useMemo(() => {
    return {
      startMouseEvent: mouseDownEvent,
      draggingId: dragging ? activeId : undefined,
      startRect,
      draggingOffset,
      overDroppable,
    }
  }, [activeId, dragging, draggingOffset, mouseDownEvent, overDroppable, startRect])

  return (
    <DndSnapshotContext.Provider value={snapshot}>
      <DropIndicatorContext.Provider value={dropIndicatorState}>
        {
          children
        }
      </DropIndicatorContext.Provider>
    </DndSnapshotContext.Provider>
  )
})
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { DropEvent, DropIndicator, IDndSnapshot, Identifier, Offset, OverInfo } from "./types";
import { getRecentRxElement } from "@rxdrag/shared";
import { DRAGGABLE_ATTR_ID_NAME, DROPPABLE_ATTR_ID_NAME } from "./consts";
import { DndSnapshotContext, DropIndicatorContext } from "./contexts";

export type DndContextProps = {
  onDrop?: (e: DropEvent) => void,
  onDragEnd?: () => void,
  onDragCancel?: () => void,
  children?: React.ReactNode
}

export const DndContext = memo((
  props: DndContextProps
) => {
  const { onDrop, onDragEnd, onDragCancel, children } = props;
  const [mouseDownEvent, setMouseDownEvent] = useState<MouseEvent>();
  const [activeId, setActiveId] = useState<Identifier>();
  const [dragging, setDragging] = useState<boolean>()
  const [draggingOffset, setDraggingOffset] = useState<Offset>()
  const [draggingOffsetInDroppable, setDraggingOffsetInDroppable] = useState<Offset>()
  const [overDraggable, setOverDraggable] = useState<OverInfo>()
  const [overDroppable, setOverDroppable] = useState<OverInfo>()
  const dropIndicatorState = useState<DropIndicator>()
  const [dropIndicator, setDropIndeicator] = dropIndicatorState

  const mouseDownEventRef = useRef(mouseDownEvent)
  mouseDownEventRef.current = mouseDownEvent

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (e.target) {
      const draggedElement = getRecentRxElement(e.target as HTMLElement, DRAGGABLE_ATTR_ID_NAME)
      if (draggedElement) {
        setMouseDownEvent(e)
        setActiveId(draggedElement.getAttribute(DRAGGABLE_ATTR_ID_NAME) || undefined)
      }
    }
  }, [])

  const getOverInfo = useCallback((attrName: string, e: MouseEvent) => {
    const recentElement = getRecentRxElement(e.target as HTMLElement, attrName)
    if (recentElement) {
      const draggableRect = recentElement.getBoundingClientRect()
      const offsetX = e.clientX - draggableRect.left
      const offsetY = e.clientY - draggableRect.top
      const over: OverInfo = {
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
      const draggableOver = getOverInfo(DRAGGABLE_ATTR_ID_NAME, e)
      setOverDraggable(draggableOver)
      const droppableOver: OverInfo | undefined = getOverInfo(DROPPABLE_ATTR_ID_NAME, e)
      setOverDroppable(droppableOver)
      if (Math.abs(e.screenX - startEvent.screenX) > 5 ||
        Math.abs(e.screenY - startEvent.screenY) > 5) {
        setDragging(true)
        const offset = { x: 0, y: 0 }
        offset.x = e.clientX - startEvent.clientX
        offset.y = e.clientY - startEvent.clientY
        setDraggingOffset(offset)
      }
    }
  }, [getOverInfo])

  const resetState = useCallback(() => {
    setOverDraggable(undefined)
    setOverDroppable(undefined)
    setDragging(false)
    setDraggingOffset(undefined)
    setMouseDownEvent(undefined)
    setActiveId(undefined)
    setDropIndeicator(undefined)
  }, [setDropIndeicator])

  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (overDroppable?.id && activeId && dropIndicator !== undefined && !dropIndicator.cannotDrop) {
      onDrop?.({
        activeId: activeId,
        originalEvent: e,
        droppableId: overDroppable.id,
        afterId: dropIndicator.afterId,
        draggingOffsetInDroppable: draggingOffsetInDroppable,
      })
    } else {
      onDragCancel?.()
    }
    resetState()
    onDragEnd?.()
  }, [activeId, draggingOffsetInDroppable, dropIndicator, onDragCancel, onDragEnd, onDrop, overDroppable?.id, resetState])

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
      draggingOffset,
      draggingOffsetInDroppable,
      overDraggable,
      overDroppable,
    }
  }, [activeId, dragging, draggingOffset, draggingOffsetInDroppable, mouseDownEvent, overDraggable, overDroppable])

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
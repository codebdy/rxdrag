import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { DragCancelEvent, DropEvent, DragStartEvent, IDndSnapshot, Identifier, Offset } from "./types";
import { getRecentRxElement } from "@rxdrag/shared";
import { DRAGGABLE_ATTR_ID_NAME } from "./consts";
import { DndSnapshotContext } from "./contexts";

export type DndContextProps = {
  onDragStart?: (e: DragStartEvent) => void,
  // onDragMove?: (e: DragMoveEvent) => void,
  // onDragOver?: (e: DragOverEvent) => void,
  onDrop?: (e: DropEvent) => void,
  onDragCancel?: (e: DragCancelEvent) => void,
  children?: React.ReactNode
}

export const DndContext = memo((
  props: DndContextProps
) => {
  const { children } = props;
  const [mouseDownEvent, setMouseDownEvent] = useState<MouseEvent>();
  const [activeId, setActiveId] = useState<Identifier>();
  const [dragging, setDragging] = useState<boolean>()
  const [draggingOffset, setDraggingOffset] = useState<Offset>()
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

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const startEvent = mouseDownEventRef.current
    if (startEvent) {
      if (Math.abs(e.screenX - startEvent.screenX) > 5 ||
        Math.abs(e.screenY - startEvent.screenY) > 5) {
        setDragging(true)
        const offset = { x: 0, y: 0 }
        offset.x = e.clientX - startEvent.clientX
        offset.y = e.clientY - startEvent.clientX
        setDraggingOffset(offset)
        //setMouseMoveEvent(e);
      }
    }
  }, [])

  const handleMouseUp = useCallback((e: MouseEvent) => {
    setDragging(false)
    setDraggingOffset(undefined)
    setMouseDownEvent(undefined)
    setActiveId(undefined)
  }, [])

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
    }
  }, [activeId, dragging, draggingOffset, mouseDownEvent])

  return (
    <DndSnapshotContext.Provider value={snapshot}>
      {
        children
      }
    </DndSnapshotContext.Provider>
  )
})
import { memo } from "react"
import { DragCancelEvent, DragEndEvent, DragMoveEvent, DragOverEvent, DragStartEvent } from "./types";

export type DndContextProps = {
  onDragStart?: (e: DragStartEvent) => void,
  onDragMove?: (e: DragMoveEvent) => void,
  onDragOver?: (e: DragOverEvent) => void,
  onDragEnd?: (e: DragEndEvent) => void,
  onDragCancel?: (e: DragCancelEvent) => void,
  children?: React.ReactNode
}

export const DndContext = memo((
  props: DndContextProps
) => {
  const { children } = props;
  return (
    <>
      {
        children
      }
    </>
  )
})
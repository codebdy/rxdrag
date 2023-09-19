import { memo, useCallback, useMemo } from "react"
import { DraggableChildrenFn, DraggleProvider, IDraggableSnapshot, Identifier } from "./types";
import { DRAGGABLE_ATTR_ID_NAME, DRAGGABLE_HNADLER_ATTR_ID_NAME } from "./consts";
import { useDndSnapshot } from "./hooks/useDndSnapshot";
import { DraggableContext } from "./contexts";

export type DraggableProps = {
  draggableId: Identifier;
  children?: DraggableChildrenFn;
  hasHandler?: boolean;
}

export const Draggable = memo((
  props: DraggableProps
) => {
  const { draggableId, children, hasHandler } = props
  const dndSnapshot = useDndSnapshot()

  const handleRefChange = useCallback((element?: HTMLElement | null) => {
    element?.setAttribute(DRAGGABLE_ATTR_ID_NAME, draggableId)
    if (!hasHandler) {
      element?.setAttribute(DRAGGABLE_HNADLER_ATTR_ID_NAME, draggableId)
    }
  }, [draggableId, hasHandler])

  const handleHanderRefChange = useCallback((element?: HTMLElement | null) => {
    element?.setAttribute(DRAGGABLE_HNADLER_ATTR_ID_NAME, draggableId)
  }, [draggableId])

  const snapshot: IDraggableSnapshot = useMemo(() => {
    return {
      isDragging: dndSnapshot.draggingId === draggableId,
      draggingOffset: dndSnapshot.draggingOffset,
    }
  }, [dndSnapshot.draggingId, dndSnapshot.draggingOffset, draggableId])


  const provider: DraggleProvider = useMemo(() => {
    return {
      innerRef: handleRefChange,
      handlerRef: handleHanderRefChange,
    }
  }, [handleHanderRefChange, handleRefChange])

  return (
    <DraggableContext.Provider value={draggableId}>
      {
        children && children(provider, snapshot)
      }
    </DraggableContext.Provider>
  )
})
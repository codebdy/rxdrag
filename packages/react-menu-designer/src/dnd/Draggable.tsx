import { memo, useCallback, useEffect, useMemo } from "react"
import { DraggableChildrenFn, DraggleProvider, IDraggableSnapshot, Identifier } from "./types";
import { DRAGGABLE_ATTR_ID_NAME, DRAGGABLE_HNADLER_ATTR_ID_NAME } from "./consts";
import { useDndSnapshot } from "./hooks/useDndSnapshot";
import { useChildItemsState } from "./hooks/useChildItemsState";
import { DraggableContext } from "./contexts";

export type DraggableProps = {
  draggableId: Identifier;
  index?: number;
  children?: DraggableChildrenFn;
  hasHandler?: boolean;
}

export const Draggable = memo((
  props: DraggableProps
) => {
  const { draggableId, index, children, hasHandler } = props
  const dndSnapshot = useDndSnapshot()
  const [, setItems] = useChildItemsState() || []

  //向容器注册组件
  useEffect(() => {
    if (!setItems) {
      return
    }

    setItems((items) => {
      const newItems = items.filter(item => item.id !== draggableId)
      const realIndex = index === undefined ? newItems.length : index
      newItems.push({ id: draggableId, index: realIndex })
      newItems.sort((a, b) => a.index - b.index)
      return newItems
    })

    return () => {
      setItems((items) => {
        return items.filter(item => item.id !== draggableId)
      })
    }
  }, [draggableId, index, setItems])

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
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { DraggableChildrenFn, IDraggableStateSnapshot, Identifier } from "./types";
import { DRAGGABLE_ATTR_ID_NAME } from "./consts";
import { useDndSnapshot } from "./hooks/useDndSnapshot";

export type DraggableProps = {
  draggableId: Identifier;
  index?: number;
  clonable?: boolean;
  //目标位置的占位符
  renderPlaceholder?: DraggableChildrenFn;
  //鼠标跟随物
  mouseFollower?: DraggableChildrenFn;
  children?: DraggableChildrenFn
}

export const Draggable = memo((
  props: DraggableProps
) => {
  const { draggableId, children } = props
  const [ref, setRef] = useState<HTMLElement>()
  const dndSnapshot = useDndSnapshot()

  const handleRefChange = useCallback((element?: HTMLElement | null) => {
    element?.setAttribute(DRAGGABLE_ATTR_ID_NAME, draggableId.toString())
    setRef(element || undefined)
  }, [draggableId])

  const snapshot: IDraggableStateSnapshot = useMemo(() => {
    return {
      isDragging: dndSnapshot.draggingId === draggableId,
    }
  }, [dndSnapshot.draggingId, draggableId])

  useEffect(() => {
    if (dndSnapshot.draggingId === draggableId && draggableId) {
      if (dndSnapshot.draggingOffset) {
        ref?.style.setProperty("transform", `translate(${dndSnapshot.draggingOffset.x}px,${dndSnapshot.draggingOffset.y}px)`)
        if (!ref?.style.getPropertyValue('z-index')) {
          ref?.style.setProperty("z-index", "1")
        }
      }
    } else {
      ref?.style.setProperty("transform", `translate(0px,0px)`)
      ref?.style.removeProperty("z-index")
    }
  }, [dndSnapshot.draggingOffset, dndSnapshot.draggingId, draggableId, ref?.style])

  return (
    <>
      {
        children && children(handleRefChange, snapshot)
      }
    </>
  )
})
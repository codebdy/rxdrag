import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { DraggableChildrenFn, IDraggableStateSnapshot, Identifier } from "./types";
import { DRAGGABLE_ATTR_ID_NAME } from "./consts";
import { useDndSnapshot } from "./hooks/useDndSnapshot";

export type DraggableProps = {
  draggableId: Identifier;
  index: number;
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
      isDragging: false,
    }
  }, [])

  useEffect(() => {
    if (dndSnapshot.draggingId === draggableId && draggableId && dndSnapshot.draggingOffset) {
      ref?.style.setProperty("transform", `translate(${dndSnapshot.draggingOffset.x}px,${dndSnapshot.draggingOffset.y}px)`)
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
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { DraggableChildrenFn, IDraggableStateSnapshot, Identifier } from "./types";
import { DRAGGABLE_ATTR_ID_NAME } from "./consts";
import { useDndSnapshot } from "./hooks/useDndSnapshot";
import styled from "styled-components";

const MouseFollower = styled.div`
  position: fixed;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
`

export type DraggableProps = {
  draggableId: Identifier;
  index?: number;
  clonable?: boolean;
  //鼠标跟随物
  mouseFollower?: React.ReactNode;
  children?: DraggableChildrenFn;
}

export const Draggable = memo((
  props: DraggableProps
) => {
  const { draggableId, clonable, mouseFollower, children } = props
  const [element, setElement] = useState<HTMLElement>()
  const followerRef = useRef<HTMLDivElement>(null)
  const dndSnapshot = useDndSnapshot()

  //const follerRef = mouseFollower ? mouseFollowerRef.current : element

  const handleRefChange = useCallback((element?: HTMLElement | null) => {
    element?.setAttribute(DRAGGABLE_ATTR_ID_NAME, draggableId.toString())
    setElement(element || undefined)
  }, [draggableId])

  const snapshot: IDraggableStateSnapshot = useMemo(() => {
    return {
      isDragging: dndSnapshot.draggingId === draggableId,
    }
  }, [dndSnapshot.draggingId, draggableId])

  useEffect(() => {
    const followerElement = followerRef.current
    if (dndSnapshot.draggingId === draggableId && draggableId) {
      followerElement?.style.setProperty("opacity", "1");
      if (dndSnapshot.draggingOffset) {
        followerElement?.style.setProperty("transform", `translate(${dndSnapshot.draggingOffset.x}px,${dndSnapshot.draggingOffset.y}px)`)
      }
    } else {
      followerElement?.style.removeProperty("opacity")
      followerElement?.style.removeProperty("transform")
    }
  }, [dndSnapshot.draggingOffset, dndSnapshot.draggingId, draggableId])

  useEffect(() => {
    const newElement = element?.cloneNode(true)
    const followerElement = followerRef.current
    if (followerElement && newElement && !mouseFollower) {
      followerElement.appendChild(newElement)
      return () => {
        followerElement.removeChild(newElement)
      }
    }
  }, [clonable, element, mouseFollower])

  return (
    <>
      {
        children && children(handleRefChange, snapshot)
      }
      <MouseFollower
        ref={followerRef}
        style={{
          left: element?.getBoundingClientRect().left,
          top: element?.getBoundingClientRect().top,
          width: element?.getBoundingClientRect().width,
          height: element?.getBoundingClientRect().height,
        }}
      >
        {
          mouseFollower
        }
      </MouseFollower>
    </>
  )
})
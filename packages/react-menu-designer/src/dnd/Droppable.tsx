import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { DroppableGhostFn, DroppableChildrenFn, IDroppableStateSnapshot, Identifier } from "./types"
import { DroppableContext, DroppableParams, defualtDroppableParams } from "../contexts";
import { DROPPABLE_ATTR_ID_NAME } from "./consts";
import { useDndSnapshot } from "./hooks/useDndSnapshot";
import styled from "styled-components";

const PlaceHolder = styled.div`
  position: fixed;
`

export type Direction = 'horizontal' | 'vertical';

export type DroppableProps = {
  droppableId: Identifier
  dropDisabled?: boolean,
  direction?: Direction,
  children?: DroppableChildrenFn,
  //目标位置的占位符
  renderGhost?: DroppableGhostFn
}

export const Droppable = memo((props: DroppableProps) => {
  const { droppableId, children, renderGhost: renderPlaceholder } = props
  const droppableState = useState<DroppableParams>(defualtDroppableParams)
  const dndSnapshot = useDndSnapshot()
  const [ghostElement, getGhostElement] = useState<HTMLElement>()
  const [element, setElement] = useState<HTMLElement>()

  const handleRefChange = useCallback((element?: HTMLElement | null) => {
    element?.setAttribute(DROPPABLE_ATTR_ID_NAME, droppableId)
    setElement(element || undefined)
  }, [droppableId])

  const handleGhostRefChange = useCallback((element?: HTMLElement | null) => {
    element?.style.setProperty("pointer-events", "none");
    element?.style.setProperty("position", "fixed");
    getGhostElement(element || undefined)
  }, [])

  const snapshot: IDroppableStateSnapshot = useMemo(() => {
    return {
      isDraggingOver: dndSnapshot.overDroppable?.id === droppableId,
      over: {
        ...dndSnapshot.overDroppable,
        targetIndex: 0,
      }
    }
  }, [dndSnapshot.overDroppable, droppableId])


  //控制Ghost位置
  useEffect(() => {
    if (ghostElement) {
      if (snapshot.isDraggingOver) {
        const rect = element?.getBoundingClientRect()
        ghostElement.style.setProperty("top", rect?.top + "px")
        ghostElement.style.setProperty("left", rect?.left + "px")
        ghostElement.style.setProperty("width", rect?.width + "px")
      }
    }
  }, [element, ghostElement, snapshot.isDraggingOver])

  //控制Ghost的显示跟隐藏
  useEffect(() => {
    if (ghostElement && !snapshot.isDraggingOver) {
      const display = ghostElement.style.getPropertyValue("display")
      ghostElement.style.setProperty("display", "none")
      return () => {
        if (display) {
          ghostElement.style.setProperty("display", display)
        } else {
          ghostElement.style.removeProperty("display")
        }
      }
    }
  }, [ghostElement, snapshot.isDraggingOver])

  return (
    <DroppableContext.Provider value={droppableState}>
      {children && children(handleRefChange, snapshot)}
      <PlaceHolder>
        {renderPlaceholder && renderPlaceholder(handleGhostRefChange, dndSnapshot.draggingId)}
      </PlaceHolder>
    </DroppableContext.Provider>
  )
})
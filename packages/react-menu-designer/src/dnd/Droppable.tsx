import { memo, useCallback, useMemo, useState } from "react"
import { DroppableChildrenFn, IDroppableStateSnapshot, Identifier } from "./types"
import { DroppableContext, DroppableParams, defualtDroppableParams } from "../contexts";


export type Direction = 'horizontal' | 'vertical';

export type DroppableProps = {
  droppableId: Identifier
  dropDisabled?: boolean,
  direction?: Direction,
  children?: DroppableChildrenFn
}

export const Droppable = memo((props: DroppableProps) => {
  const { children } = props
  const droppableState = useState<DroppableParams>(defualtDroppableParams)

  const handleRefChange = useCallback((element?: HTMLElement | null) => {
    //
  }, [])

  const snapshot: IDroppableStateSnapshot = useMemo(() => {
    return {
      isDraggingOver: false,
    }
  }, [])

  return (
    <DroppableContext.Provider value={droppableState}>
      {children && children(handleRefChange, snapshot)}
    </DroppableContext.Provider>
  )
})
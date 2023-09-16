import { memo, useCallback, useMemo } from "react"
import { DraggableChildrenFn, IDraggableStateSnapshot, Identifier } from "./types";

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
  const { children } = props
  const handleRefChange = useCallback((element?: HTMLElement | null) => {
    //
  }, [])

  const snapshot: IDraggableStateSnapshot = useMemo(() => {
    return {
      isDragging: false,
    }
  }, [])

  return (
    <>
      {
        children && children(handleRefChange, snapshot)
      }
    </>
  )
})
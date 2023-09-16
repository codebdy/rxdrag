import { memo } from "react"
import { DraggableChildrenFn, Identifier } from "./types";

export type DraggableProps = {
  draggableId: Identifier;
  index: number;
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
  return (
    <>
      {
        children && children()
      }
    </>
  )
})
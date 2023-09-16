import { memo } from "react"
import { Identifier } from "./types"


export type Direction = 'horizontal' | 'vertical';

export type DroppableProps = {
  droppableId: Identifier
  dropDisabled?: boolean,
  direction?: Direction,
}

export const Droppable = memo((props: DroppableProps) => {
  return (
    <>
    </>
  )
})
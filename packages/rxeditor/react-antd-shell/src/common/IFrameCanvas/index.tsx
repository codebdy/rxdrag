import { Canvas, CanvasProxy } from "@rxdrag/react-core"
import { IReactComponents } from "@rxdrag/react-shared"
import { memo } from "react"

export const IFrameCanvas = memo((
  props: {
    designers: IReactComponents,
  }
) => {
  const { designers } = props
  return (
    <CanvasProxy components={designers}>
      <Canvas />
    </CanvasProxy>
  )
})
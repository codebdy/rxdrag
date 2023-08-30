import { Canvas, ICanvasProxy } from "@rxdrag/react-core"
import { IReactComponents } from "@rxdrag/react-shared"
import { memo } from "react"
import { INodeSchema } from "@rxdrag/schema"

export const IFrameCanvas = memo((
  props: {
    designers: IReactComponents,
    //ui框架schema，支持框架的时候使用
    frameSchema?: INodeSchema,
  }
) => {
  const { designers } = props
  return (
    <ICanvasProxy components={designers}>
      <Canvas />
    </ICanvasProxy>
  )
})
import { IReactComponents } from "@rxdrag/react-shared"
import { memo } from "react"
import { IFramePreviewInner } from "./IFramePreviewInner"
import { IPreviewProxy } from "@rxdrag/react-core"
import { ControllerFactories } from "@rxdrag/react-runner"
import { INodeSchema } from "@rxdrag/schema"

export const IFramePreview = memo((
  props: {
    components: IReactComponents,
    controllerFactories?: ControllerFactories,
    //ui框架schema，支持框架的时候使用
    frameSchema?: INodeSchema,
  }
) => {
  const { components, controllerFactories } = props
  return (
    <IPreviewProxy components={components}>
      <IFramePreviewInner controllerFactories={controllerFactories} />
    </IPreviewProxy>
  )
})
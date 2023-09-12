import { IReactComponents } from "@rxdrag/react-shared"
import { memo } from "react"
import { IFramePreviewInner } from "./IFramePreviewInner"
import { IPreviewProxy } from "@rxdrag/react-core"
import { ControllerFactories } from "@rxdrag/react-runner"

export const IFramePreview = memo((
  props: {
    components: IReactComponents,
    controllerFactories?: ControllerFactories,
  }
) => {
  const { components, controllerFactories } = props
  return (
    <IPreviewProxy components={components}>
      <IFramePreviewInner controllerFactories={controllerFactories} />
    </IPreviewProxy>
  )
})
import { IReactComponents } from "@rxdrag/react-shared"
import { memo } from "react"
import { IFrameZoomablePreviewInner } from "./IFrameZoomablePreviewInner"
import { IPreviewProxy } from "@rxdrag/react-core"
import { ControllerFactories } from "@rxdrag/react-runner"

export const IFrameZoomablePreview = memo((
  props: {
    components: IReactComponents,
    controllerFactories?: ControllerFactories,
  }
) => {
  const { components, controllerFactories } = props
  return (
    <IPreviewProxy components={components}>
      <IFrameZoomablePreviewInner controllerFactories={controllerFactories} />
    </IPreviewProxy>
  )
})
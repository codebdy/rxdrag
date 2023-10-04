import { IReactComponents } from "@rxdrag/react-shared"
import { memo } from "react"
import { IFrameZoomablePreviewInner } from "./IFrameZoomablePreviewInner"
import { ControllerFactories } from "@rxdrag/react-runner"
import { PreviewIFrameProxy } from "./PreviewIFrameProxy"

export const IFrameZoomablePreview = memo((
  props: {
    components: IReactComponents,
    controllerFactories?: ControllerFactories,
  }
) => {
  const { components, controllerFactories } = props
  return (
    <PreviewIFrameProxy components={components}>
      <IFrameZoomablePreviewInner controllerFactories={controllerFactories} />
    </PreviewIFrameProxy>
  )
})
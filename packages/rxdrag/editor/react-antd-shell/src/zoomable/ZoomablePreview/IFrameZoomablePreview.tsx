import { IReactComponents } from "@rxdrag/react-shared"
import { memo } from "react"
import { IFrameZoomablePreviewInner } from "./IFrameZoomablePreviewInner"
import { PreviewIFrameProxy } from "./PreviewIFrameProxy"
import { ControllerFactory } from "@rxdrag/minions-runtime-react"

export const IFrameZoomablePreview = memo((
  props: {
    components: IReactComponents,
    controllers?: ControllerFactory,
  }
) => {
  const { components, controllers } = props
  return (
    <PreviewIFrameProxy components={components}>
      <IFrameZoomablePreviewInner controllers={controllers} />
    </PreviewIFrameProxy>
  )
})
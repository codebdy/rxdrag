import { Preview } from "@rxdrag/react-core"
import { ControllerFactories, usePreviewComponents } from "@rxdrag/react-runner"
import { memo } from "react"

export const IFrameZoomablePreviewInner = memo((
  props: {
    controllerFactories?: ControllerFactories,
  }
) => {
  const { controllerFactories = {} } = props;
  const components = usePreviewComponents()
  return (
    <Preview components={components} controllerFactories={controllerFactories} />
  )
})
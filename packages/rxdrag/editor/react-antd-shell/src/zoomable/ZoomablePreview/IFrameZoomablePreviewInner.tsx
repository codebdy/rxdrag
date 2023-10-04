import { ControllerFactory } from "@rxdrag/minions-runtime-react";
import { usePreviewComponents } from "@rxdrag/react-runner"
import { memo } from "react"
import { ZoomablePreview } from "./ZoomablePreview";

export const IFrameZoomablePreviewInner = memo((
  props: {
    controllers?: ControllerFactory,
  }
) => {
  const { controllers } = props;
  const components = usePreviewComponents()
  return (
    <ZoomablePreview components={components} controllers={controllers} />
  )
})
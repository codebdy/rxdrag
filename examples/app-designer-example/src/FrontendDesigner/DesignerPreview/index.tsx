import { memo } from "react"
import { PreviewIFrameProxy } from "@rxdrag/react-antd-shell/src/zoomable/ZoomablePreview"
import { ModulePreview } from "./ModulePreview"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { PagePreview } from "./ModulePreview/PagePreview"

export const DesignerPreview = memo(() => {
  const appFront = useAppFrontend()

  return (
    <PreviewIFrameProxy>
      {
        appFront?.frameSchema
          ? <ModulePreview
            frameSchema={appFront.frameSchema}
          />
          : <PagePreview />
      }
    </PreviewIFrameProxy>
  )
})
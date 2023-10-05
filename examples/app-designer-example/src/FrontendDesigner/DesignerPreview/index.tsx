import { memo } from "react"
import { ModulePreview } from "./ModulePreview"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { PagePreview } from "./ModulePreview/PagePreview"
import { PreviewIFrameProxy } from "@rxdrag/react-antd-shell"

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
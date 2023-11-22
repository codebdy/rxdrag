import { memo } from "react"
import { ModulePreview } from "./ModulePreview"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { PagePreview } from "./ModulePreview/PagePreview"
import { useIFrameParams } from "@rxdrag/react-core"

export const DesignerPreviewInner = memo(() => {
  const appFront = useAppFrontend()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { showFrame } = (useIFrameParams() as any)||{}

  return (
    appFront?.frameSchema && showFrame
      ? <ModulePreview
        frameSchema={appFront.frameSchema}
      />
      : <PagePreview />
  )
})
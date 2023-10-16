import { memo } from "react"
import { PreviewIFrameProxy } from "@rxdrag/react-antd-shell"
import { DesignerPreviewInner } from "./DesignerPreviewInner"

export const DesignerPreview = memo(() => {

  return (
    <PreviewIFrameProxy>
      <DesignerPreviewInner />
    </PreviewIFrameProxy>
  )
})
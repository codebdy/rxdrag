import { ZoomableEditor } from "@rxdrag/react-antd-shell"
import { memo, useMemo } from "react"
import { IDocumentSchema } from "@rxdrag/schema"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { frameToolboxes } from "../config"

export const UiFrameDesignerInner = memo(() => {
  const appFront = useAppFrontend()

  const schemas: (IDocumentSchema[]) | undefined = useMemo(() => appFront?.frameSchema ? [
    {
      title: "页面框架",
      schema: appFront.frameSchema,
    },
  ] : undefined, [appFront?.frameSchema])

  const Toolbox = frameToolboxes[appFront?.deviceType || ""]
  return (
    <ZoomableEditor
      toolbox={
        Toolbox && <Toolbox />
      }
      schemas={schemas}
    />
  )
})
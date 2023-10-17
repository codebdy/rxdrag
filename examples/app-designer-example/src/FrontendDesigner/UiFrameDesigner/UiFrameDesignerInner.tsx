import { ZoomableEditor } from "@rxdrag/react-antd-shell"
import { memo, useMemo } from "react"
import { IViewSchema } from "@rxdrag/schema"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { frameToolboxes } from "./config"

export const UiFrameDesignerInner = memo(() => {
  const appFront = useAppFrontend()

  const schemas: (IViewSchema[]) | undefined = useMemo(() => appFront?.frameSchema ? [
    {
      id:"frame",
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
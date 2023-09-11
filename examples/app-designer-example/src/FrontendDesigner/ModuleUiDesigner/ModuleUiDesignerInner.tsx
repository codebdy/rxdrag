import { ZoomableEditor } from "@rxdrag/react-antd-shell"
import { memo } from "react"
import { useParams } from "react-router-dom"
import { useQueryModule } from "../../hooks/useQueryModule"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { uiToolboxes } from "../config"

export const ModuleUiDesignerInner = memo(() => {
  const { moduleId } = useParams()
  const device = useAppFrontend()?.deviceType
  const { module } = useQueryModule(device, moduleId || "")
  const Toolbox = uiToolboxes[device || ""]
  return (
    module
      ? <ZoomableEditor
        toolbox={
          Toolbox && <Toolbox />
        }
        schemas={module?.scenes}
      />
      : <></>
  )
})
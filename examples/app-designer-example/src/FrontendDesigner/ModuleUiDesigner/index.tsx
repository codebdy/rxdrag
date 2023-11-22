import { EditorScope } from "@rxdrag/react-antd-shell"
import { memo } from "react"
import { ModuleUiDesignerInner } from "./ModuleUiDesignerInner"
import { materials } from "example-common"
import { useAppThemeMode } from "../../hooks/useAppThemeMode"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { CANVAS_URL_PREFIX, PREVIEW_URL_PREFIX } from "../consts"
import { useParams } from "react-router-dom"
import { LayoutPart } from "../../interfaces"
import { useQueryModule } from "../../hooks/useQueryModule"
import { XDataInput, setterLocales } from "./setters"

export const ModuleUiDesigner = memo(() => {
  const { device } = useParams()
  const themeMode = useAppThemeMode()
  const frontend = useAppFrontend()
  const { moduleId } = useParams()
  const { module } = useQueryModule(frontend?.deviceType, moduleId || "")

  return (
    <EditorScope
      locales={setterLocales}
      canvasUrl={`/${CANVAS_URL_PREFIX}/${device}/${LayoutPart.module}`}
      previewUrl={`/${PREVIEW_URL_PREFIX}/${device}/${LayoutPart.module}/${module?.id}`}
      themeMode={themeMode}
      setters={{
        //新的XDataInput覆盖旧的
        XDataInput
      }}
      materials={materials}
      canvasConfig={frontend?.canvasConfig}
    >
      <ModuleUiDesignerInner module={module} />
    </EditorScope>
  )
})
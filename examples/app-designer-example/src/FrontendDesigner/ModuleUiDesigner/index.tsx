import { EditorScope } from "@rxdrag/react-antd-shell"
import { memo } from "react"
import { ModuleUiDesignerInner } from "./ModuleUiDesignerInner"
import { setterLocales, minionsMaterialCategories, minionsLocales, controllerDefines, materials } from "example-common"
import { useAppThemeMode } from "../../hooks/useAppThemeMode"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { CANVAS_URL_PREFIX, PREVIEW_URL_PREFIX } from "../consts"
import { useParams } from "react-router-dom"
import { LayoutPart } from "../../interfaces"

export const ModuleUiDesigner = memo(() => {
  const { device } = useParams()
  const themeMode = useAppThemeMode()
  const frontend = useAppFrontend()
  return (
    <EditorScope
      locales={setterLocales}
      canvasUrl={`${CANVAS_URL_PREFIX}${device}/${LayoutPart.page}`}
      previewUrl={`${PREVIEW_URL_PREFIX}${device}/${LayoutPart.page}`}
      themeMode={themeMode}
      minionOptions={{
        materials: minionsMaterialCategories,
        locales: minionsLocales,
        controllers: controllerDefines,
      }}

      materials={materials}
      canvasConfig={frontend?.canvasConfig}
    >
      <ModuleUiDesignerInner />
    </EditorScope>
  )
})
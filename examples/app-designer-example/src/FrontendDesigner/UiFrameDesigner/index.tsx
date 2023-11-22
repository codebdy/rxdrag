import { EditorScope } from "@rxdrag/react-antd-shell"
import { memo } from "react"
import { UiFrameDesignerInner } from "./UiFrameDesignerInner"
import { setterLocales } from "example-common"
import { useAppThemeMode } from "../../hooks/useAppThemeMode"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { frameMaterilas } from "./materials"
import { useParams } from "react-router-dom"
import { LayoutPart } from "../../interfaces"
import { CANVAS_URL_PREFIX, PREVIEW_URL_PREFIX } from "../consts"

export const UiFrameDesigner = memo(() => {
  const { device } = useParams()
  const themeMode = useAppThemeMode()
  const frontend = useAppFrontend()
  return (
    <EditorScope
      locales={setterLocales}
      canvasUrl={`/${CANVAS_URL_PREFIX}/${device}/${LayoutPart.frame}`}
      previewUrl={`/${PREVIEW_URL_PREFIX}/${device}/${LayoutPart.frame}`}
      themeMode={themeMode}
      materials={frameMaterilas[frontend?.deviceType || ""]}
      canvasConfig={frontend?.canvasConfig}
    >
      <UiFrameDesignerInner />
    </EditorScope>
  )
})
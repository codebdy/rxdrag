import { EditorScope } from "@rxdrag/react-antd-shell"
import { memo } from "react"
import { UiFrameDesignerInner } from "./UiFrameDesignerInner"
import { setterLocales, minionsMaterialCategories, minionsLocales, controllerDefines, materials } from "example-common"
import { useAppThemeMode } from "../../hooks/useAppThemeMode"
import { useAppFrontend } from "../../hooks/useAppFrontend"

export const UiFrameDesigner = memo((
  props: {
    canvasUrl: string,
    previewUrl: string,
  }
) => {
  const { canvasUrl, previewUrl } = props;
  const themeMode = useAppThemeMode()
  const frontend = useAppFrontend()
  return (
    <EditorScope
      locales={setterLocales}
      canvasUrl={canvasUrl}
      previewUrl={previewUrl}
      themeMode={themeMode}
      minionOptions={{
        materials: minionsMaterialCategories,
        locales: minionsLocales,
        controllers: controllerDefines,
      }}

      materials={materials}
      canvasConifg={frontend?.canvasConfig}
    >
      <UiFrameDesignerInner />
    </EditorScope>
  )
})
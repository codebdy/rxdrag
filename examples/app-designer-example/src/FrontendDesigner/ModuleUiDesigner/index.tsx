import { EditorScope } from "@rxdrag/react-antd-shell"
import { memo } from "react"
import { ModuleUiDesignerInner } from "./ModuleUiDesignerInner"
import { setterLocales, minionsMaterialCategories, minionsLocales, controllerDefines, materials } from "example-common"
import { useAppThemeMode } from "../../hooks/useAppThemeMode"
import { useAppFrontend } from "../../hooks/useAppFrontend"

export const ModuleUiDesigner = memo((
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
      canvasConfig={frontend?.canvasConfig}
    >
      <ModuleUiDesignerInner />
    </EditorScope>
  )
})
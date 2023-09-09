import { EditorScope } from "@rxdrag/react-antd-shell"
import { memo } from "react"
import { FrameUiDesignerInner } from "./FrameUiDesignerInner"
import { setterLocales, minionsMaterialCategories, minionsLocales, controllerDefines, materials } from "example-common"
import { useAppThemeMode } from "../../hooks/useAppThemeMode"

export const FrameUiDesigner = memo((
  props: {
    canvasUrl: string,
    previewUrl: string,
  }
) => {
  const { canvasUrl, previewUrl } = props;
  const themeMode = useAppThemeMode()
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
    >
      <FrameUiDesignerInner />
    </EditorScope>
  )
})
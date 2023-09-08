import { memo } from "react"
import { EditorScope } from "@rxdrag/react-antd-shell"
import { controllerDefines, materials, minionsLocales, minionsMaterialCategories, setterLocales } from "example-common"
import { AppDesignerExampleInner } from "./AppDesignerExampleInner"

export const AppDesignerExample = memo((
  props: {
    canvasUrl: string,
    previewUrl: string,
  }
) => {
  const { canvasUrl, previewUrl } = props
  return (
    <EditorScope
      locales={setterLocales}
      canvasUrl={canvasUrl}
      previewUrl={previewUrl}
      themeMode="dark"
      minionOptions={{
        materials: minionsMaterialCategories,
        locales: minionsLocales,
        controllers: controllerDefines,
      }}

      materials={materials}
    >
      <AppDesignerExampleInner />
    </EditorScope>
  )
})
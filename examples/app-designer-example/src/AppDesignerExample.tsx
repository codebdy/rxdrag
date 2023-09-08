import { memo } from "react"
import { EditorScope } from "@rxdrag/react-antd-shell"
import { controllerDefines, materials, minionsLocales, minionsMaterialCategories, setterLocales } from "example-common"
import { AppDesignerExampleInner } from "./AppDesignerExampleInner"
import { useQueryApp } from "./hooks/useQueryApp"
import { AppContext } from "./contexts"
import { appDesignerLocales } from "./locales"
import _ from "lodash"

export const AppDesignerExample = memo((
  props: {
    canvasUrl: string,
    previewUrl: string,
  }
) => {
  const { canvasUrl, previewUrl } = props
  const { app } = useQueryApp("app1")

  return (
    <AppContext.Provider value={app}>
      <EditorScope
        locales={{ ..._.merge(setterLocales, appDesignerLocales) }}
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
    </AppContext.Provider>
  )
})
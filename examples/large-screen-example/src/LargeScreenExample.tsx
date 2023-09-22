import { memo } from "react"
import { EditorScope } from "@rxdrag/react-antd-shell"
import { controllerDefines, minionsLocales, minionsMaterialCategories } from "example-common"
import { LargeScreenExampleInner } from "./LargeScreenExampleInner"
import { largeScreenMaterials } from "./marerials/materials"
import { largeScreenSetters } from "./setters/setters"
import { resourceCategoryLocales } from "./marerials/locales"
import { LayoutType } from "@rxdrag/react-core"

export const LargeScreenExample = memo((
  props: {
    canvasUrl: string,
    previewUrl: string,
  }
) => {
  const { canvasUrl, previewUrl } = props
  return (
    <EditorScope
      themeMode="dark"
      //自由布局
      layoutType={LayoutType.Freedom}
      locales={resourceCategoryLocales}
      canvasUrl={canvasUrl}
      previewUrl={previewUrl}
      minionOptions={{
        materials: minionsMaterialCategories,
        locales: minionsLocales,
        controllers: controllerDefines,
      }}
      materials={largeScreenMaterials}
      setters={largeScreenSetters}
    >
      <LargeScreenExampleInner />
    </EditorScope>
  )
})
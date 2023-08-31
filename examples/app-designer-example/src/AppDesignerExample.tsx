import { memo } from "react"
import { EditorScope } from "@rxdrag/react-antd-shell"
import { setterLocales } from "example-common"
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
    >
      <AppDesignerExampleInner />
    </EditorScope>
  )
})
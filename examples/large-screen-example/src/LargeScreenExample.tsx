import { memo } from "react"
import { EditorScope } from "@rxdrag/react-antd-shell"
import { setterLocales } from "example-common"
import { LargeScreenExampleInner } from "./LargeScreenExampleInner"

export const LargeScreenExample = memo((
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
      <LargeScreenExampleInner />
    </EditorScope>
  )
})
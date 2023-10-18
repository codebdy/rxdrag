import { memo } from "react"
import { UmlEditorInner, UmlEditorProps } from "./UmlEditorInner"
import { RecoilRoot } from "recoil"

export const UmlEditor = memo((props: UmlEditorProps) => {

  return <RecoilRoot>
    <UmlEditorInner {...props} />
  </RecoilRoot>
})

UmlEditor.displayName = "UmlEditor"
import { memo, useMemo } from "react"
import { UmlEditorInner, UmlEditorProps } from "./UmlEditorInner"
import { RecoilRoot } from "recoil"
import { LocalesManager } from "@rxdrag/locales"
import { LocalesContext } from "@rxdrag/react-locales"

export const UmlEditor = memo((props: UmlEditorProps) => {
  const localesManager = useMemo(() => new LocalesManager(), [])
  return <RecoilRoot>
    <LocalesContext.Provider value={localesManager}>
      <UmlEditorInner {...props} />
    </LocalesContext.Provider>
  </RecoilRoot>
})

UmlEditor.displayName = "UmlEditor"
import { memo } from "react"
import { UmlEditor } from "@rxdrag/uml-editor"
import SaveActions from "./SaveActions"
import { modelEditorLocales } from "./locales"

export const ModelEditor = memo(() => {
  return (
    <UmlEditor
      metaContent={undefined}
      metaId={undefined}
      actions={<SaveActions meta = {undefined}/>}
      locales={modelEditorLocales}
    />
  )
})
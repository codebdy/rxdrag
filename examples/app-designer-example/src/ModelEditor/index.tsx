import { memo } from "react"
import { UmlEditor } from "@rxdrag/uml-editor"
import SaveActions from "./SaveActions"

export const ModelEditor = memo(() => {
  return (
    <UmlEditor
      metaContent={undefined}
      metaId={undefined}
      actions={<SaveActions meta = {undefined}/>}
    />
  )
})
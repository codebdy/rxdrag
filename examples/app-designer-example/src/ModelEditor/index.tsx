import { memo } from "react"
import { UmlEditor } from "@rxdrag/uml-editor"
import SaveActions from "./SaveActions"
import { modelEditorLocales } from "./locales"
import { useQueryAppMeta } from "../hooks/useQueryAppMeta"

export const ModelEditor = memo(() => {
  const { meta } = useQueryAppMeta("app1")
  return (
    <UmlEditor
      metaContent={meta?.publishedContent}
      metaId={meta?.id}
      actions={<SaveActions meta={undefined} />}
      locales={modelEditorLocales}
    />
  )
})
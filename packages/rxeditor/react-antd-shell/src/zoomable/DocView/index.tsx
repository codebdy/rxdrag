import { memo } from "react"
import { IDocument } from "@rxdrag/core"
import { DocViewInner } from "./DocViewInner"
import { DocumentRoot } from "@rxdrag/react-core"


export const DocView = memo((
  props: {
    doc: IDocument,
    params?: unknown,
  }
) => {
  const { doc, params } = props
  return (
    <DocumentRoot doc={doc}>
      <DocViewInner params={params} />
    </DocumentRoot>
  )
})
import { memo } from "react"
import { IDocument } from "@rxdrag/core"
import { DocViewInner } from "./DocViewInner"
import { DocumentRoot } from "@rxdrag/react-core"


export const DocView = memo((
  props: {
    doc: IDocument
  }
) => {
  const { doc } = props
  return (
    <DocumentRoot doc={doc}>
      <DocViewInner/>
    </DocumentRoot>
  )
})
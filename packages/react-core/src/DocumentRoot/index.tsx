import { DocumentContext } from "core-react/contexts"
import { IDocument } from "core/interfaces"
import { memo } from "react"

export const DocumentRoot = memo((
  props: {
    doc: IDocument,
    children?: React.ReactNode
  }
) => {
  const { doc, children } = props
  return (
    <DocumentContext.Provider value={doc}>
      {children}
    </DocumentContext.Provider>
  )
})
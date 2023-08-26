import React from "react"
import { DocumentContext } from "../contexts"
import { IDocument } from "@rxdrag/core"
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
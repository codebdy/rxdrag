import { Canvas, useActivedDocument } from "@rxdrag/react-core"
import { memo } from "react"
import { DocumentRoot } from "@rxdrag/react-core"

export const IFrameCanvasInner = memo(() => {
  const doc = useActivedDocument()
  return (
    doc
      ? <DocumentRoot doc={doc}>
        <Canvas />
      </DocumentRoot>
      : <></>
  )
})
import { Canvas, useActivedDocument } from "@rxdrag/react-core"
import { memo } from "react"

export const IFrameCanvasInner = memo(() => {
  const doc = useActivedDocument()
  return (
    doc
      ? <Canvas doc={doc} />
      : <></>
  )
})
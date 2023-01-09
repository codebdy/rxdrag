import { IComponents } from "core-react/interfaces";
import { IDesignerEngine, IDocument } from "core/interfaces";
import { memo } from "react"
import { CanvasRender } from "../CanvasRender"

declare const window: Window & { engine?: IDesignerEngine, doc?: IDocument, components?: IComponents };

export const IFrameCanvasRender = memo(() => {
  const engine = window.engine
  const doc = window.doc
  const components = window.components
  return (
    doc ?
      <CanvasRender engine={engine} doc={doc} components={components} />
      : null
  )
})
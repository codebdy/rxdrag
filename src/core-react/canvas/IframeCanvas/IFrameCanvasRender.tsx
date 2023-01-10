import { IComponents } from "core-react/interfaces";
import { IDesignerEngine, IDocument } from "core/interfaces";
import { memo } from "react"
import { CanvasRender } from "../CanvasRender"

declare const window: Window & { engine?: IDesignerEngine, doc?: IDocument };

export const IFrameCanvasRender = memo((props: {
  designers: IComponents
}) => {
  const {designers}= props
  const engine = window.engine
  const doc = window.doc

  return (
    doc ?
      <CanvasRender engine={engine} doc={doc} components={designers} />
      : null
  )
})
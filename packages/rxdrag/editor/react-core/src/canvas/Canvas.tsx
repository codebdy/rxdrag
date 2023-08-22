import { memo, useEffect } from "react"
import { ComponentTreeWidget } from "../ComponentTreeWidget"
import { CanvasImpl, CanvasResizeDriver, CanvasScrollDriver, DragDropDriver, DragOverDriver, IDocument, MouseClickDriver, MouseMoveDriver, MouseOverOutDriver, MouseUpDriver } from "@rxdrag/core"
import { useDesignerEngine } from "../hooks"

export const Canvas = memo((
  props: {
    doc: IDocument
  }
) => {
  const { doc } = props
  const engine = useDesignerEngine()
  //创建Canvas
  useEffect(() => {
    const shell = engine?.getShell()
    const rootNode = doc.getRootNode()
    if (engine && rootNode?.id) {
      const canvasImpl = new CanvasImpl(
        doc.id,
        engine,
        rootNode.id,
        [
          DragDropDriver,
          DragOverDriver,
          MouseClickDriver,
          MouseMoveDriver,
          MouseOverOutDriver,
          CanvasResizeDriver,
          CanvasScrollDriver,
          MouseUpDriver
        ]
      )
      shell?.addCanvas(canvasImpl)
      return () => {
        shell?.removeCanvas(doc.id)
      }
    }

  }, [doc, engine])

  return (
    <ComponentTreeWidget doc={doc} />
  )
})
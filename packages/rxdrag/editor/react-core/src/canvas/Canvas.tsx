import { memo, useContext, useEffect } from "react"
import { ComponentTreeWidget } from "../ComponentTreeWidget"
import { CanvasImpl, CanvasResizeDriver, CanvasScrollDriver, DragDropDriver, DragOverDriver, IDocument, MouseClickDriver, MouseMoveDriver, MouseOverOutDriver, MouseUpDriver } from "@rxdrag/core"
import { useDesignerEngine } from "../hooks"
import { InIframeContext } from "../contexts"

export const Canvas = memo((
  props: {
    doc: IDocument
  }
) => {
  const { doc } = props
  const engine = useDesignerEngine()
  const inFrame = useContext(InIframeContext)
  //创建Canvas
  useEffect(() => {
    const shell = engine?.getShell()
    const rootNode = doc.getRootNode()
    if (engine && rootNode?.id) {
      const canvasImpl = new CanvasImpl(
        doc.id,
        engine,
        rootNode.id,
        //防止重复处理事件
        inFrame
          ? [
            DragDropDriver,
            DragOverDriver,
            MouseClickDriver,
            MouseMoveDriver,
            MouseOverOutDriver,
            CanvasResizeDriver,
            CanvasScrollDriver,
            MouseUpDriver
          ]
          : [
            DragOverDriver,
            MouseClickDriver,
            MouseOverOutDriver,
            CanvasScrollDriver,
            MouseUpDriver
          ]
      )
      shell?.addCanvas(canvasImpl)
      return () => {
        shell?.removeCanvas(doc.id)
      }
    }

  }, [doc, engine, inFrame])

  return (
    <ComponentTreeWidget doc={doc} />
  )
})
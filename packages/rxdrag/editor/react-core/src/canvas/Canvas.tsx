import { memo, useContext, useEffect } from "react"
import { ComponentTreeWidget } from "../ComponentTreeWidget"
import { CanvasImpl, CanvasResizeDriver, CanvasScrollDriver, DragDropDriver, DragOverDriver, MouseClickDriver, MouseMoveDriver, MouseOverOutDriver, MouseUpDriver } from "@rxdrag/core"
import { useDesignerEngine, useDocument } from "../hooks"
import { InIframeContext } from "../contexts"

export const Canvas = memo(() => {
  const doc = useDocument()
  const engine = useDesignerEngine()
  const inFrame = useContext(InIframeContext)
  //创建Canvas
  useEffect(() => {
    const shell = engine?.getShell()
    const rootNode = doc?.getRootNode()
    if (engine && doc && rootNode?.id) {
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
    doc
      ? <>
        <ComponentTreeWidget doc={doc} />
        {/* 辅助部件容器 */}
        <div id={`aux-${doc.id}`} />
      </>
      : <></>
  )
})
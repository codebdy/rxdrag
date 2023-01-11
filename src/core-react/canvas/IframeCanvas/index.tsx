import { useMemo, useRef } from "react"
import { memo, useCallback } from "react"
import { useDesignerEngine } from "core-react/hooks";
import { IDocument } from "core/interfaces";
import { IFrameCanvasImpl } from "core/shell/IFrameCanvasImpl";
import { CanvasResizeDriver, CanvasScrollDriver, DragDropDriver, MouseClickDriver, MouseMoveDriver } from "core/shell/drivers";
import { MouseOverOutDriver } from "core/shell/drivers/MouseOverOutDriver";
import { DragOverDriver } from "core/shell/drivers/DragOverDriver";
import { useDocumentViewTypeState } from "core-react/hooks/useDocumentViewTypeState";
import { CanvasShell } from "../CanvasShell";
import { MouseUpDriver } from "core/shell/drivers/MouseUpDriver";

export const IframeCanvas = memo((
  props: {
    doc: IDocument
    renderUrl: string,
  }
) => {
  const { doc, renderUrl } = props;
  const ref = useRef<HTMLIFrameElement>(null)
  const [viewType] = useDocumentViewTypeState(doc?.id)

  console.log("IframeCanvas 刷新", doc.id)

  const engine = useDesignerEngine()

  if (ref && engine && ref.current?.contentWindow) {
    if (ref.current.contentWindow) {
      (ref.current.contentWindow as any)["engine"] = engine;
      (ref.current.contentWindow as any)["doc"] = doc;
    }
  }

  const handleLoaded = useCallback(() => {
    const shell = engine?.getShell()
    if (ref.current && engine && ref.current.contentWindow) {
      shell?.removeCanvas(doc.id)
      const canvasImpl = new IFrameCanvasImpl(
        engine,
        ref.current,
        doc.id,
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
    }
  }, [doc, engine])

  const key = useMemo(() => `canvas-${doc.id}`, [doc.id])

  return (
    <CanvasShell display={viewType === "design"} >
      <iframe
        key={key}
        ref={ref}
        title={key}
        style={{ border: "0", width: "100%", height: "100%" }}
        src={renderUrl}
        onLoad={handleLoaded}
      >
      </iframe>
    </CanvasShell>
  )
})
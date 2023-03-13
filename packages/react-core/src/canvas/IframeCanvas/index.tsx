import { useMemo, useRef } from "react"
import { memo, useCallback } from "react"
import { useDesignerEngine } from "../../hooks";
import { IDocument, IFrameCanvasImpl } from "@rxdrag/core";
import { CanvasResizeDriver, CanvasScrollDriver, DragDropDriver, MouseClickDriver, MouseMoveDriver } from "@rxdrag/core";
import { MouseOverOutDriver, DragOverDriver, MouseUpDriver } from "@rxdrag/core";
import { useDocumentViewTypeState } from "../../hooks/useDocumentViewTypeState";
import { CanvasShell } from "../CanvasShell";

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
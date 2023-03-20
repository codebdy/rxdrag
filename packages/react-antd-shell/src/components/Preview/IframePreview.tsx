import { useCallback, useMemo } from "react"
import { memo } from "react"
import { IDocument } from "@rxdrag/core";
import { useDocumentViewTypeState, useDesignerEngine, CanvasShell } from "@rxdrag/react-core";

export const IframePreview = memo((
  props: {
    doc: IDocument
    renderUrl: string,
  }
) => {
  const { doc, renderUrl } = props;
  const [viewType] = useDocumentViewTypeState(doc?.id)
  const engine = useDesignerEngine()
  const handleRefChange = useCallback((el: HTMLIFrameElement | null) => {
    if (el && engine && el?.contentWindow) {
      if (el.contentWindow) {
        (el.contentWindow as any)["engine"] = engine;
        (el.contentWindow as any)["doc"] = doc;
      }
    }
  }, [doc, engine])

  const key = useMemo(() => `preview-${doc.id}`, [doc.id])

  return (
    <CanvasShell display={viewType === "preview"} >
      <iframe
        key={key}
        ref={handleRefChange}
        title={key}
        style={{ border: "0", width: "100%", height: "100%" }}
        src={renderUrl}
      >
      </iframe>
    </CanvasShell>
  )
})
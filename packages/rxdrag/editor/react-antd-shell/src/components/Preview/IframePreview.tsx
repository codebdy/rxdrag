/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { memo } from "react"
import { IDocument } from "@rxdrag/core";
import { useDocumentViewTypeState, useDesignerEngine, CanvasShell } from "@rxdrag/react-core";
import { EVENT_DOC_CHANGE, EVENT_IFRAME_READY } from "@rxdrag/react-core/src/canvas/IframeCanvas/consts";

export const IframePreview = memo((
  props: {
    doc: IDocument
    renderUrl: string,
  }
) => {
  const { doc, renderUrl } = props;
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLIFrameElement>(null)
  const [viewType] = useDocumentViewTypeState(doc?.id)
  const engine = useDesignerEngine()
  const handleLoaded = useCallback(() => {
    if (ref.current && engine && ref.current?.contentWindow) {
      if (ref.current.contentWindow) {
        (ref.current.contentWindow as any)["engine"] = engine;
        (ref.current.contentWindow as any)["doc"] = doc;
        // 需要确认 iframe 加载完毕以后再渲染，实际顺序无法保证，所以通过 postMessage 来通知子窗口
        ref.current.contentWindow.postMessage({ name: EVENT_IFRAME_READY });
        setLoaded(true);
      }
    }
  }, [doc, engine])

  const key = useMemo(() => `preview-${doc.id}`, [doc.id])

  useEffect(() => {
    if (loaded) {
      ref.current?.contentWindow?.postMessage({ name: EVENT_DOC_CHANGE, payload: doc.id });
    }
  }, [doc.id, loaded])

  return (
    <CanvasShell display={viewType === "preview"} >
      <iframe
        ref={ref}
        onLoad={handleLoaded}
        title={key}
        style={{ border: "0", width: "100%", height: "100%" }}
        src={renderUrl}
      >
      </iframe>
    </CanvasShell>
  )
})
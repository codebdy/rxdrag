import { IframeHTMLAttributes, useCallback, useEffect, useRef, useState } from "react"
import { memo } from "react"
import { useDesignerEngine } from "../../hooks";
import { EVENT_DOC_CHANGE, EVENT_IFRAME_READY, EVENT_PARAMS_CHANGE } from "./constants";
import { IDocument } from "@rxdrag/core";

//对iframe的封装，附加engine
export const IFrame = memo((
  props: IframeHTMLAttributes<HTMLIFrameElement> & {
    doc: IDocument,
    params?: unknown,
  }
) => {
  const { doc, params, src, style, ...rest } = props;
  const ref = useRef<HTMLIFrameElement>(null)
  const engine = useDesignerEngine()
  const [ready, setReady] = useState<boolean>()

  const handleLoaded = useCallback(() => {
    if (ref.current && engine && ref.current.contentWindow) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ref.current.contentWindow as any)["engine"] = engine;
      // 需要确认 iframe 加载完毕以后再渲染，实际顺序无法保证，所以通过 postMessage 来通知子窗口
      ref.current.contentWindow.postMessage({ name: EVENT_IFRAME_READY });
      setReady(true)
    }
  }, [engine])

  useEffect(() => {
    if (ready) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ref.current?.contentWindow as any)["doc"] = doc;
      ref.current?.contentWindow?.postMessage({ name: EVENT_DOC_CHANGE });
    }
  }, [doc, ready])

  useEffect(() => {
    if (ref.current && ready) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ref.current.contentWindow as any)["params"] = params
      ref.current.contentWindow?.postMessage({ name: EVENT_PARAMS_CHANGE });
    }
  }, [engine, params, ready])

  return (
    <iframe
      ref={ref}
      src={engine ? src : undefined}
      style={{ border: "0", width: "100%", height: "100%", ...style }}
      onLoad={handleLoaded}
      {...rest}
    >
    </iframe>
  )
})
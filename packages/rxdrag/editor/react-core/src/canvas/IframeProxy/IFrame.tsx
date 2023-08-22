import { IframeHTMLAttributes, useCallback, useRef } from "react"
import { memo } from "react"
import { useDesignerEngine } from "../../hooks";
import { EVENT_IFRAME_READY } from "./constants";

//对iframe的封装，附加engine
export const IFrame = memo((
  props: IframeHTMLAttributes<HTMLIFrameElement>
) => {
  const { src, ...rest } = props;
  const ref = useRef<HTMLIFrameElement>(null)
  const engine = useDesignerEngine()

  const handleLoaded = useCallback(() => {
    if (ref.current && engine && ref.current.contentWindow) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ref.current.contentWindow as any)["engine"] = engine;
      // 需要确认 iframe 加载完毕以后再渲染，实际顺序无法保证，所以通过 postMessage 来通知子窗口
      ref.current.contentWindow.postMessage({ name: EVENT_IFRAME_READY });
    }
  }, [engine])
  
  return (
    <iframe
      ref={ref}
      src={engine ? src : undefined}
      onLoad={handleLoaded}
      {...rest}
    >
    </iframe>
  )
})
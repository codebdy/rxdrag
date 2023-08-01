import { IDesignerEngine, IDocument } from "@rxdrag/core";
import { IComponents } from "@rxdrag/react-shared";
import { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { CanvasRender } from "../CanvasRender"
import { EVENT_DOC_CHANGE, EVENT_IFRAME_READY } from "./constants";
import { ID } from "@rxdrag/shared";
import { useDocumentViewTypeState } from "../../hooks";

declare const window: Window & { engine?: IDesignerEngine, doc?: IDocument };

export interface IFrameCanvasEvent {
  name: string,
  payload?: ID,
}

export const IFrameCanvasRender = memo((props: {
  designers: IComponents
}) => {
  const { designers } = props
  const [doc, setDoc] = useState<IDocument | null>();
  const [ready, setReady] = useState(false);
  const engine = window.engine
  const [viewType] = useDocumentViewTypeState(doc?.id)

  const receiveMessageFromParent = useCallback((event: MessageEvent<IFrameCanvasEvent>) => {
    // 监听父窗口 ready 事件
    if (event.data?.name === EVENT_IFRAME_READY) {
      console.log('RXDrag: iframeReady');
      //这个代码不能删，要不然windows下不能运行
      setReady(true);
    } else if (event.data.name === EVENT_DOC_CHANGE || event.data?.name === EVENT_IFRAME_READY) {
      const dc = engine?.getDocument(event.data.payload || "")
      setDoc(dc)
    }
  }, [engine])

  useEffect(() => {
    window.addEventListener('message', receiveMessageFromParent, false);
  }, [receiveMessageFromParent])


  return (
    doc && engine && viewType === "design" ? 
      <CanvasRender key={doc.id} engine={engine} doc={doc} components={designers} />
      : null
  )
})
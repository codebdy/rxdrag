import { IDesignerEngine, IDocument } from "@rxdrag/core";
import { DesignerEngineContext, IFrameCanvasEvent } from "@rxdrag/react-core";
import { IReactComponents } from "@rxdrag/react-shared";
import { memo, useCallback, useEffect } from "react"
import { PreviewRender } from "./PreviewRender";
import { EVENT_IFRAME_READY, EVENT_DOC_CHANGE } from "@rxdrag/react-core";
import { useState } from "react";
import { ControllerFactories } from "@rxdrag/react-runner";

declare const window: Window & { engine?: IDesignerEngine, doc?: IDocument };

export const IFramePreviewRender = memo((props: {
  components: IReactComponents,
  controllerFactories?: ControllerFactories,
}) => {
  const { components, controllerFactories } = props
  const [doc, setDoc] = useState<IDocument | null>();
  const [ready, setReady] = useState(false);
  const engine = window.engine

  const receiveMessageFromParent = useCallback((event: MessageEvent<IFrameCanvasEvent>) => {
    // 监听父窗口 ready 事件
    if (event.data?.name === EVENT_IFRAME_READY) {
      console.log('RXDrag: Preview iframeReady');
      setReady(true);
    } else if (event.data.name === EVENT_DOC_CHANGE) {
      const dc = engine?.getDocument(event.data.payload || "")
      setDoc(dc)
    }
  }, [engine])

  useEffect(() => {
    window.addEventListener('message', receiveMessageFromParent, false);
  }, [receiveMessageFromParent])

  console.log("刷新 IFramePreviewRender", doc)
  return (
    ready ?
      <DesignerEngineContext.Provider value={engine}>
        {
          doc ?
            <PreviewRender key={doc.id} doc={doc} components={components} controllerFactories={controllerFactories} />
            : null
        }
      </DesignerEngineContext.Provider>
      : <></>
  )
})
import { IDesignerEngine, IDocument } from "@rxdrag/core";
import { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { DesignerEngineContext, DocumentRoot, EVENT_DOC_CHANGE, EVENT_IFRAME_READY, IFrameCanvasEvent, InIframeContext, Scroller } from "..";
import { IReactComponents } from "@rxdrag/react-shared";
import { Fieldy } from "@rxdrag/react-fieldy";
import { PreviewComponentsContext } from "@rxdrag/react-runner";

declare const window: Window & { engine?: IDesignerEngine, doc?: IDocument };

//尽量放在Ifame的顶层
export const IPreviewProxy = memo((
  props: {
    components: IReactComponents
    children?: React.ReactNode,
  }
) => {
  const { components, children } = props;
  const [doc, setDoc] = useState<IDocument>()
  const [engine, setEngine] = useState<IDesignerEngine>()
  const receiveMessageFromParent = useCallback((event: MessageEvent<IFrameCanvasEvent>) => {
    // 监听父窗口 ready 事件
    if (event.data?.name === EVENT_IFRAME_READY) {
      console.log('RXDrag: preview iframeReady');
      setEngine(window.engine);
    }
    if (event.data?.name === EVENT_DOC_CHANGE) {
      setDoc(window.doc)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('message', receiveMessageFromParent, false);
    return () => {
      window.removeEventListener('message', receiveMessageFromParent)
    }
  }, [receiveMessageFromParent])

  return (
    doc
      ? <Fieldy>
        <InIframeContext.Provider value={true}>
          <DesignerEngineContext.Provider value={engine}>
            <PreviewComponentsContext.Provider value={components}>
              <DocumentRoot doc={doc}>
                {engine ? children : <></>}
                <Scroller />
              </DocumentRoot>
            </PreviewComponentsContext.Provider>
          </DesignerEngineContext.Provider>
        </InIframeContext.Provider>
      </Fieldy>
      : <></>
  )
})
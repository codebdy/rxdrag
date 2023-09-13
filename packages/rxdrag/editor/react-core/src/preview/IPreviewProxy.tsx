import { IDesignerEngine, IDocument } from "@rxdrag/core";
import { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { DesignerEngineContext, EVENT_IFRAME_READY, IFrameCanvasEvent, InIframeContext, Scroller } from "..";
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
  const [engine, setEngine] = useState<IDesignerEngine>()
  const receiveMessageFromParent = useCallback((event: MessageEvent<IFrameCanvasEvent>) => {
    // 监听父窗口 ready 事件
    if (event.data?.name === EVENT_IFRAME_READY) {
      console.log('RXDrag: iframeReady');
      setEngine(window.engine);
    }
  }, [])

  useEffect(() => {
    window.addEventListener('message', receiveMessageFromParent, false);
    return () => {
      window.removeEventListener('message', receiveMessageFromParent)
    }
  }, [receiveMessageFromParent])

  return (
    <Fieldy>
      <InIframeContext.Provider value={true}>
        <DesignerEngineContext.Provider value={engine}>
          <PreviewComponentsContext.Provider value={components}>
            {engine ? children : <></>}
            <Scroller />
          </PreviewComponentsContext.Provider>
        </DesignerEngineContext.Provider>
      </InIframeContext.Provider>
    </Fieldy>
  )
})
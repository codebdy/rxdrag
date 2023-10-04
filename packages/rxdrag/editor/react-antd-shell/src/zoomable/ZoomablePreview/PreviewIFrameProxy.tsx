import { IDesignerEngine } from "@rxdrag/core";
import { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { IReactComponents } from "@rxdrag/react-shared";
import { Fieldy } from "@rxdrag/react-fieldy";
import { PreviewComponentsContext } from "@rxdrag/react-runner";
import { IFrameCanvasEvent, EVENT_IFRAME_READY, InIframeContext, DesignerEngineContext, Scroller } from "@rxdrag/react-core";

declare const window: Window & { engine?: IDesignerEngine };

//尽量放在Ifame的顶层
export const PreviewIFrameProxy = memo((
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
      console.log('RXDrag: preview iframeReady');
      setEngine(window.engine);
    }
  }, [])

  useEffect(() => {
    window.addEventListener('message', receiveMessageFromParent, false);
    return () => {
      window.removeEventListener('message', receiveMessageFromParent)
    }
  }, [receiveMessageFromParent])

  useEffect(() => {
    setEngine(window.engine)
  }, [])

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
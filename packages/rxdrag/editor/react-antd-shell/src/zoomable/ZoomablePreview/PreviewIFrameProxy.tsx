import { IDesignerEngine, MouseClickDriver, MouseMoveDriver, ShellPart } from "@rxdrag/core";
import { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { Fieldy, VirtualForm } from "@rxdrag/react-fieldy";
import { IFrameCanvasEvent, EVENT_IFRAME_READY, InIframeContext, DesignerEngineContext, Scroller } from "@rxdrag/react-core";

declare const window: Window & { engine?: IDesignerEngine };

//尽量放在Ifame的顶层
export const PreviewIFrameProxy = memo((
  props: {
    children?: React.ReactNode,
  }
) => {
  const { children } = props;
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

  useEffect(() => {
    if (engine) {
      const part = new ShellPart(
        engine,
        [
          MouseClickDriver,
          MouseMoveDriver,
        ]
      )

      return () => {
        part.destroy()
      }
    }
  }, [engine])

  return (
    <Fieldy>
      <VirtualForm name="root">
        <InIframeContext.Provider value={true}>
          <DesignerEngineContext.Provider value={engine}>
            {engine ? children : <></>}
            <Scroller />
          </DesignerEngineContext.Provider>
        </InIframeContext.Provider>
      </VirtualForm>
    </Fieldy>
  )
})
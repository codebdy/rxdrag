import { IDesignerEngine, IDocument } from "@rxdrag/core";
import { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { ID } from "@rxdrag/shared";
import { EVENT_IFRAME_READY } from "./constants";
import { DesignerEngineContext, Scroller } from "../..";
import { IReactComponents } from "@rxdrag/react-shared";
import { DesignRoot } from "../../DesignRoot";

declare const window: Window & { engine?: IDesignerEngine, doc?: IDocument };

export interface IFrameCanvasEvent {
  name: string,
  payload?: ID,
}

//尽量放在Ifame的顶层
export const DesignerProxy = memo((
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
    <DesignerEngineContext.Provider value={engine}>
      <DesignRoot components={components}>
        {engine ? children : <></>}
        <Scroller />
      </DesignRoot>
    </DesignerEngineContext.Provider>
  )
})
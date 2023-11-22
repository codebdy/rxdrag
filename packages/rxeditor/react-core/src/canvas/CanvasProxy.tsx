import { IDesignerEngine, IDocument } from "@rxdrag/core";
import { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { ID } from "@rxdrag/shared";
import { EVENT_DOC_CHANGE, EVENT_IFRAME_READY, EVENT_PARAMS_CHANGE } from "./IframeProxy/constants";
import { DesignerEngineContext, DocumentRoot, InIframeContext, ParamsContext, Scroller } from "..";
import { IReactComponents } from "@rxdrag/react-shared";
import { ComponentDesignersRoot } from "../ComponentDesignersRoot";
import { Fieldy } from "@rxdrag/react-fieldy";
import { LocalesContext } from "@rxdrag/react-locales";
declare const window: Window & { engine?: IDesignerEngine, doc?: IDocument, params?: unknown | undefined };

export interface IFrameCanvasEvent {
  name: string,
  payload?: ID,
}

//尽量放在Ifame的顶层
export const CanvasProxy = memo((
  props: {
    components: IReactComponents
    children?: React.ReactNode,
  }
) => {
  const { components, children } = props;
  const [engine, setEngine] = useState<IDesignerEngine>()
  const [doc, setDoc] = useState<IDocument>()
  const [params, setParams] = useState<unknown>()
  const receiveMessageFromParent = useCallback((event: MessageEvent<IFrameCanvasEvent>) => {
    // 监听父窗口 ready 事件
    if (event.data?.name === EVENT_IFRAME_READY) {
      console.log('RXDrag: iframeReady');
      setEngine(window.engine);
    } else if (event.data?.name === EVENT_DOC_CHANGE) {
      console.log('RXDrag: document change');
      setDoc(window.doc)
    } else if (event.data?.name === EVENT_PARAMS_CHANGE) {
      setParams(window.params)
    }
  }, [])

  //预防消息还没订阅，父窗口就已将把消息发了，先把已经传来的数据拿过来
  useEffect(() => {
    setParams(window.params)
    setEngine(window.engine);
    setDoc(window.doc)
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
        <ParamsContext.Provider value={params}>
          <InIframeContext.Provider value={true}>
            <DesignerEngineContext.Provider value={engine}>
              <LocalesContext.Provider value={engine?.getLocalesManager()}>
                <ComponentDesignersRoot components={components}>
                  <DocumentRoot doc={doc}>
                    {engine ? children : <></>}
                    <Scroller />
                  </DocumentRoot>
                </ComponentDesignersRoot>
              </LocalesContext.Provider>
            </DesignerEngineContext.Provider>
          </InIframeContext.Provider>
        </ParamsContext.Provider>
      </Fieldy>
      : <></>
  )
})
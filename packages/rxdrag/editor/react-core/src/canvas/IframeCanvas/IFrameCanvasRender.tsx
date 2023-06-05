import { IDesignerEngine, IDocument } from "@rxdrag/core";
import { IComponents } from "@rxdrag/react-shared";
import React, { useState } from "react"
import { memo } from "react"
import { CanvasRender } from "../CanvasRender"
import { EVENT_DOC_CHANGE, EVENT_IFRAME_READY } from "./consts";
import { ID } from "@rxdrag/shared";

declare const window: Window & { engine?: IDesignerEngine, doc?: IDocument };

export interface IFrameCanvasEvent {
  name: string,
  payload?: ID,
}

export const IFrameCanvasRender = memo((props: {
  designers: IComponents
}) => {
  const { designers } = props
  const [doc, setDoc] = useState<IDocument|null>();
  const [ready, setReady] = useState(false);
  const engine = window.engine
  //const doc = window.doc

  function receiveMessageFromParent(event: MessageEvent<IFrameCanvasEvent>) {
    // 监听父窗口 ready 事件
    if (event.data?.name === EVENT_IFRAME_READY) {
      console.log('RXDrag: iframeReady');
      setReady(true);
    } else if (event.data.name === EVENT_DOC_CHANGE) {
      const dc= engine?.getDocument(event.data.payload||"")
      setDoc(dc)
    }
  }

  window.addEventListener('message', receiveMessageFromParent, false);

  return (
    doc && engine && !!ready ?
      <CanvasRender key={doc.id} engine={engine} doc={doc} components={designers} />
      : null
  )
})
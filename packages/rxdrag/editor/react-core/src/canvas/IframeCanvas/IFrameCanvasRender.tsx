import { IDesignerEngine, IDocument } from "@rxdrag/core";
import { IComponents } from "@rxdrag/react-shared";
import React, { useState } from "react"
import { memo } from "react"
import { CanvasRender } from "../CanvasRender"
import { EVENT_IFRAME_READY } from "./consts";

declare const window: Window & { engine?: IDesignerEngine, doc?: IDocument };

export const IFrameCanvasRender = memo((props: {
  designers: IComponents
}) => {
  const {designers}= props
  const [ready, setReady] = useState(false);
  const engine = window.engine
  const doc = window.doc

  function receiveMessageFromParent(event: MessageEvent) {
    // 监听父窗口 ready 事件
    if (event.data === EVENT_IFRAME_READY) {
      console.log('RXDrag: iframeReady');
      setReady(true);
    }
  }

  window.addEventListener('message', receiveMessageFromParent, false);

  return (
    doc && engine && !!ready ?
      <CanvasRender engine={engine} doc={doc} components={designers} />
      : null
  )
})
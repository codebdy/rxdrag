import { IDesignerEngine, IDocument } from "@rxdrag/core";
import { IComponents } from "@rxdrag/react-shared";
import React, { useState } from "react"
import { memo } from "react"
import { CanvasRender } from "../CanvasRender"

declare const window: Window & { engine?: IDesignerEngine, doc?: IDocument };

export const IFrameCanvasRender = memo((props: {
  designers: IComponents
}) => {
  const {designers}= props
  const [ready, setReady] = useState(false);
  const engine = window.engine
  const doc = window.doc

  function receiveMessageFromIndex(event: MessageEvent) {
    // 监听父窗口 ready 事件
    if (event.data === 'iframeReady') {
      console.log('RXDrag: iframeReady');
      setReady(true);
    }
  }

  window.addEventListener('message', receiveMessageFromIndex, false);

  return (
    doc && engine && !!ready ?
      <CanvasRender engine={engine} doc={doc} components={designers} />
      : null
  )
})
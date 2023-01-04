import React, { useEffect, useMemo, useRef } from "react"
import { memo, useCallback } from "react"
import ReactDOM from 'react-dom/client';
import { useDesignerEngine } from "core-react/hooks";
import { CanvasRender } from "./CanvasRender"
import { IDocument } from "core/interfaces";
import { useDesignComponents } from "core-react/hooks/useDesignComponents";
import { IFrameCanvasImpl } from "core/shell/IFrameCanvasImpl";
import { CanvasResizeDriver, CanvasScrollDriver, DragDropDriver, MouseClickDriver, MouseMoveDriver } from "core/shell/drivers";
import { MouseOverOutDriver } from "core/shell/drivers/MouseOverOutDriver";
import { DragOverDriver } from "core/shell/drivers/DragOverDriver";
import { useThemeMode } from "core-react/hooks/useThemeMode";
import { makeRxId } from "core/utils/make-rxId";

export const IframeCanvas = memo((
  props: {
    doc: IDocument
  }
) => {
  const { doc } = props;
  const ref = useRef<HTMLIFrameElement>(null)
  const styles = document.querySelectorAll("style")
  let styleText = ""
  for (let i = 0; i < styles.length; i++) {
    styleText = styleText + "\n" + styles[i].outerHTML
  }
  console.log("IframeCanvas 刷新", doc.id)
  const htmlContent = useMemo(() => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Web site created using create-react-app"
      />
      <link rel="apple-touch-icon" href="/logo192.png" />
      <!--
        manifest.json provides metadata used when your web app is installed on a
        user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
      -->
      <link rel="manifest" href="/manifest.json" />
      <title>React App</title>
      ${styleText}
    </head>
    <body style="padding:0;margin:0">
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root" style="height:100vh"></div>
      <script type="text/javascript">
        const React = window.React
        const ReactDOM = window.ReactDOM
        const CanvasRender = window.CanvasRender
        const root = ReactDOM.createRoot(
          document.getElementById('root')
        );
        root.render(CanvasRender);
      </script>
    </body>
  </html>
  
  `, [styleText])

  const engine = useDesignerEngine()
  const { components } = useDesignComponents()
  const themeMode = useThemeMode()

  useEffect(() => {
    const frameRef = ref.current;
    if (frameRef && engine && frameRef.contentWindow) {
      if (frameRef.contentWindow) {
        (frameRef.contentWindow as any)["React"] = React;
        (frameRef.contentWindow as any)["ReactDOM"] = ReactDOM;
        (frameRef.contentWindow as any)["CanvasRender"] = <CanvasRender engine={engine} doc={doc} components={components} />;
      }
    }
  }, [components, doc, engine, themeMode])

  const handleLoaded = useCallback(() => {
    const shell = engine?.getShell()
    if (ref.current && engine && ref.current.contentWindow) {
      const canvasImpl = new IFrameCanvasImpl(
        engine,
        ref.current,
        doc.id,
        [
          DragDropDriver,
          DragOverDriver,
          MouseClickDriver,
          MouseMoveDriver,
          MouseOverOutDriver,
          CanvasResizeDriver,
          CanvasScrollDriver,
        ]
      )

      shell?.addCanvas(canvasImpl)
    }
  }, [doc.id, engine])

  const key = useMemo(() => `canvas-${doc.id + themeMode}`, [doc.id, themeMode])

  return (
    <iframe
      //每次刷新都要重新渲染，要不然会报错，要让外面的代码减少渲染次数
      key={key + makeRxId()}
      ref={ref}
      title={key}
      style={{ border: "0", width: "100%", height: "100%" }}
      srcDoc={htmlContent}
      onLoad={handleLoaded}
    >
    </iframe>
  )
})
import { useMemo, useRef } from "react"
import { memo, useCallback } from "react"
import ReactDOM from 'react-dom/client';
import { useDesignerEngine } from "core-react/hooks";
import { CanvasRender } from "../CanvasRender"
import { IDocument } from "core/interfaces";
import { useDesignComponentsParams } from "core-react/hooks/useDesignComponentsParams";
import { IFrameCanvasImpl } from "core/shell/IFrameCanvasImpl";
import { CanvasResizeDriver, CanvasScrollDriver, DragDropDriver, MouseClickDriver, MouseMoveDriver } from "core/shell/drivers";
import { MouseOverOutDriver } from "core/shell/drivers/MouseOverOutDriver";
import { DragOverDriver } from "core/shell/drivers/DragOverDriver";
import { useThemeMode } from "core-react/hooks/useThemeMode";
import { useDocumentViewTypeState } from "core-react/hooks/useDocumentViewTypeState";
import { CanvasShell } from "../CanvasShell";
import { MouseUpDriver } from "core/shell/drivers/MouseUpDriver";

export const IframeCanvasOld = memo((
  props: {
    doc: IDocument
  }
) => {
  const { doc } = props;
  const ref = useRef<HTMLIFrameElement>(null)
  const rootRef = useRef<ReactDOM.Root>()
  const [viewType] = useDocumentViewTypeState(doc?.id)
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

    </body>
  </html>
  
  `, [styleText])

  const engine = useDesignerEngine()
  const { components } = useDesignComponentsParams()
  const themeMode = useThemeMode()

  // useEffect(() => {
  //   const head = document.getElementsByTagName('head')[0]
  //   head?.addEventListener("DOMNodeInserted", handleDomInserted)

  //   return () => {
  //     head?.removeEventListener("DOMNodeInserted", handleDomInserted)
  //   }
  // }, [handleDomInserted])
  // const frameRef = ref.current;
  // if (frameRef && engine && frameRef.contentWindow) {
  //   if (frameRef.contentWindow) {
  //     (frameRef.contentWindow as any)["React"] = React;
  //     (frameRef.contentWindow as any)["ReactDOM"] = ReactDOM;
  //     (frameRef.contentWindow as any)["CanvasRender"] = CanvasRender;
  //     (frameRef.contentWindow as any)["engine"] = engine;
  //     (frameRef.contentWindow as any)["doc"] = doc;
  //     (frameRef.contentWindow as any)["components"] = components;
  //   }
  // }

  const handleLoaded = useCallback(() => {
    const shell = engine?.getShell()
    if (ref.current && engine && ref.current.contentWindow) {
      shell?.removeCanvas(doc.id)
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
          MouseUpDriver
        ]
      )

      shell?.addCanvas(canvasImpl)

      const rootEl = ref.current.contentWindow?.document.getElementById("root")
      if (rootEl) {
        if (rootRef.current) {
          rootRef.current.unmount()
        }
        const root = ReactDOM.createRoot(
          rootEl
        );
        rootRef.current = root
        root.render(<CanvasRender engine={engine} doc={doc} components={components} />);
      }
    }
  }, [components, doc, engine])

  const key = useMemo(() => `canvas-${doc.id + themeMode}`, [doc.id, themeMode])

  return (
    <CanvasShell display={viewType === "design"} >
      <iframe
        key={key}
        ref={ref}
        title={key}
        style={{ border: "0", width: "100%", height: "100%" }}
        srcDoc={htmlContent}
        onLoad={handleLoaded}
      >
      </iframe>
    </CanvasShell>
  )
})
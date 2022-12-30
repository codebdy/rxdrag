import { CanvasShell } from "core-react/canvas/ShadowDomCanvas/CanvasShell";
import { ShadowCanvasView } from "core-react/canvas/ShadowDomCanvas/ShadowCanvasView";
import { useDesignerEngine } from "core-react/hooks";
import { useDocument } from "core-react/hooks/useDocument"
import { useDocumentViewTypeState } from "core-react/hooks/useDocumentViewTypeState"
import { usePreviewComponents } from "core-react/hooks/usePreviewComponents";
import { memo, useCallback, useRef } from "react"
import ReactDOM from 'react-dom/client';
import { PreviewRender } from "./PreviewRender";

export const Preview = memo((
  props: {
    backgroundColor?: string,
  }
) => {
  const { backgroundColor } = props;
  const doc = useDocument()
  const [viewType] = useDocumentViewTypeState(doc?.id)
  const { components } = usePreviewComponents()
  const engine = useDesignerEngine()
  const rootRef = useRef<ReactDOM.Root>()

  const handleRefChange = useCallback((host: HTMLElement | null) => {
    if (host) {
      if (rootRef.current) {
        //rootRef.current.unmount()
      }
      host.innerHTML = ""
      const shadow = host.attachShadow({ mode: 'open' });
      const renderIn = document.createElement('div');
      renderIn.style.height = "100%"
      renderIn.style.width = "100%"
      renderIn.style.overflow = "auto"
      const styles = document.querySelectorAll("style")
      for (let i = 0; i < styles.length; i++) {
        const styleNode = document.createElement("style")
        styleNode.innerHTML = styles[i].innerHTML
        shadow.appendChild(styleNode)
      }

      shadow.appendChild(renderIn);
      const root = ReactDOM.createRoot(
        renderIn
      );
      rootRef.current = root;
      root.render(<PreviewRender engine={engine} doc={doc} components={components} />);
    }
  }, [components, doc, engine])


  return (
    <CanvasShell display={viewType === "preview"}    >
      <ShadowCanvasView key={doc?.id} backgroundColor={backgroundColor} onRefChange={handleRefChange} />
    </CanvasShell>
  )
})
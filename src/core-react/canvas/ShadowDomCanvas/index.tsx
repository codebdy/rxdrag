import { useDesignerEngine } from "core-react/hooks";
import { useDesignComponentsParams } from "core-react/hooks/useDesignComponentsParams";
import { ShadowCanvasImpl } from "core/shell/ShadowCanvasImpl";
import { MouseOverOutDriver } from "core/shell/drivers/MouseOverOutDriver";
import { memo, useCallback, useRef } from "react"
import ReactDOM from 'react-dom/client';
import { CanvasRender } from "../CanvasRender";
import { CanvasResizeDriver, CanvasScrollDriver, DragDropDriver, MouseClickDriver } from "core/shell/drivers";
import { DragOverDriver } from "core/shell/drivers/DragOverDriver";
import "./style.less"
import { useDocumentViewTypeState } from "core-react/hooks/useDocumentViewTypeState";
import { CanvasShell } from "../CanvasShell";
import { ShadowCanvasView } from "./ShadowCanvasView";
import { useDocument } from "core-react/hooks/useDocument";

//放在flex column 布局的容器下
export const ShadowDomCanvas = memo((
  props: {
    backgroundColor?: string,
  }
) => {
  const { backgroundColor } = props;
  const doc = useDocument()
  const rootRef = useRef<ReactDOM.Root>()
  const [viewType] = useDocumentViewTypeState(doc?.id)
  const engine = useDesignerEngine()
  const { components } = useDesignComponentsParams()

  const handleRefChange = useCallback((host: HTMLElement | null) => {
    if (host && engine ) {
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

      const links = document.querySelectorAll("link")
      for (let i = 0; i < links.length; i++) {
        if (links[i].rel.toLowerCase() === "stylesheet") {
          const linkNode = document.createElement("link")
          for(let j = 0; j <links[i].attributes.length; j++){
            linkNode.setAttribute(links[i].attributes[j].name, links[i].attributes[j].value) 
          }
          linkNode.innerHTML = links[i].innerHTML
          shadow.appendChild(linkNode)
        }
      }
      shadow.appendChild(renderIn);
      if(rootRef.current){
        rootRef.current.unmount()
      }

      const root = ReactDOM.createRoot(
        renderIn
      );

      rootRef.current = root

      if (doc) {
        const canvas = new ShadowCanvasImpl(engine,
          shadow,
          renderIn,
          doc.id,
          [
            DragDropDriver,
            DragOverDriver,
            MouseOverOutDriver,
            MouseClickDriver,
            CanvasResizeDriver,
            CanvasScrollDriver,
          ]
        )
        engine.getShell().addCanvas(canvas)
        root.render(<CanvasRender engine={engine} doc={doc} components={components} />);
      }
    }
  }, [components, doc, engine])


  return (
    <CanvasShell display={viewType === "design"}    >
      <ShadowCanvasView key={doc?.id} backgroundColor={backgroundColor} onRefChange={handleRefChange} />
    </CanvasShell>
  )
})
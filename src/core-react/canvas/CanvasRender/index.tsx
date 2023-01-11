import { IDesignerEngine, IDocument } from "core"
import { memo } from "react"
import { DesignerEngineContext } from "core-react/contexts";
import { ComponentTreeWidget } from "core-react/ComponentTreeWidget";
import { DesignRoot } from "core-react/DesignRoot";
import { IComponents } from "core-react/interfaces";
import { Scroller } from "./Scroller";


export const CanvasRender = memo((props: {
  doc: IDocument,
  engine?: IDesignerEngine,
  components?: IComponents
}) => {
  const { doc, engine, components } = props;

  return (
    <DesignerEngineContext.Provider value={engine}>
      <DesignRoot components={components}>
        <Scroller />
        <ComponentTreeWidget doc={doc} />
      </DesignRoot>
    </DesignerEngineContext.Provider>
  )
})
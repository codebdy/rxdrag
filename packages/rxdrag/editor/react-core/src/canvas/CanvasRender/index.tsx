import React from "react"
import { IDesignerEngine, IDocument } from "@rxdrag/core"
import { memo } from "react"
import { DesignerEngineContext } from "../../contexts";
import { ComponentTreeWidget } from "../../ComponentTreeWidget/ComponentTreeWidget";
import { IComponents } from "@rxdrag/react-shared";
import { Scroller } from "./Scroller";
import { DesignRoot } from "../../DesignRoot";

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
import { IDocument } from "@rxdrag/core"
import { memo } from "react"
import { DocumentContext } from "../contexts"
import { ComponentDesignerView } from "./ComponentDesignerView"
import styled from "styled-components"

const ComponentTree = styled.div`
  min-height: 100%;
  min-width: 100%;
  width: 100%;
  box-sizing: border-box;
`

export type ComponentTreeWidgetProps = {
  doc: IDocument
}

export const ComponentTreeWidget = memo((
  props: ComponentTreeWidgetProps
) => {
  const { doc } = props

  const rootNode = doc.getRootNode();

  return (
    <DocumentContext.Provider value={doc}>
      <ComponentTree className="rx-component-tree">
        {
          rootNode?.id &&
          <ComponentDesignerView nodeId={rootNode?.id} />
        }
      </ComponentTree>
    </DocumentContext.Provider>
  )
})
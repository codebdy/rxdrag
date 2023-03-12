import { IDocument } from "core"
import { memo } from "react"
import { DocumentContext } from "../contexts"
import { ComponentDesignerView } from "./ComponentDesignerView"

import "./style.less"

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
      <div className="rx-component-tree">
        {
          rootNode?.id &&
          <ComponentDesignerView nodeId={rootNode?.id} />
        }
      </div>
    </DocumentContext.Provider>
  )
})
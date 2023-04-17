import { IDesignerEngine, IDocument } from "@rxdrag/core";
import { DesignerEngineContext } from "@rxdrag/react-core";
import { IComponents } from "@rxdrag/react-shared";
import { IReactionMaterial } from "@rxdrag/schema";
import { memo } from "react"
import { PreviewRender } from "./PreviewRender";

declare const window: Window & { engine?: IDesignerEngine, doc?: IDocument };

export const IFramePreviewRender = memo((props: {
  components: IComponents,
  reactionMaterials: IReactionMaterial[]
}) => {
  const { components, reactionMaterials } = props
  const engine = window.engine
  const doc = window.doc
  return (
    <DesignerEngineContext.Provider value={engine}>
      {
        doc ?
          <PreviewRender doc={doc} components={components} reactionMaterials = {reactionMaterials}/>
          : null
      }
    </DesignerEngineContext.Provider>
  )
})
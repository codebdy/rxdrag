import { DesignerEngineContext } from "core-react/contexts";
import { IComponents } from "core-react/interfaces";
import { IDesignerEngine, IDocument } from "core/interfaces";
import { memo } from "react"
import { IReactionMaterial } from "runner/minions";
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
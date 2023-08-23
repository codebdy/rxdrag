import { IDocument } from "@rxdrag/core"
import { useDocumentViewTypeState } from "@rxdrag/react-core"
import { Fieldy, VirtualForm } from "@rxdrag/react-fieldy"
import { ComponentRender, } from "@rxdrag/react-runner"
import { ControllerFactories } from "@rxdrag/react-runner"
import { IReactComponents } from "@rxdrag/react-shared"
import { INodeSchema } from "@rxdrag/schema"
import { memo, useEffect, useState } from "react"

export const Preview = memo((
  props: {
    components: IReactComponents
    doc: IDocument,
    controllerFactories: ControllerFactories,
  }
) => {
  const { components, doc, controllerFactories } = props
  const [tree, setTree] = useState<INodeSchema>()
  const [viewType] = useDocumentViewTypeState(doc?.id)

  useEffect(() => {
    setTree(doc?.getSchemaTree() || undefined)
  }, [doc, viewType])

  console.log("刷新 PreviewRender", tree)

  return (
    <Fieldy>
      <VirtualForm>
        {
          tree && <ComponentRender
            root={tree}
            components={components}
            controllerFactories={controllerFactories}
          />
        }
      </VirtualForm>
    </Fieldy>
  )
})
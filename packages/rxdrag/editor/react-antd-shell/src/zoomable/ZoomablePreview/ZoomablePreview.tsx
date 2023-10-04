import { ComponentRender, } from "@rxdrag/react-runner"
import { IReactComponents } from "@rxdrag/react-shared"
import { INodeSchema } from "@rxdrag/schema"
import { Fragment, memo, useEffect, useState } from "react"
import { VirtualForm } from "@rxdrag/react-fieldy"
import { ControllerFactory } from "@rxdrag/minions-runtime-react"
import { useDesignerEngine } from "@rxdrag/react-core"

export const ZoomablePreview = memo((
  props: {
    components: IReactComponents
    controllers?: ControllerFactory,
  }
) => {
  const { components, controllers } = props
  const [trees, setTrees] = useState<(INodeSchema | undefined)[]>()
  const engine = useDesignerEngine()

  useEffect(() => {
    const docs = engine?.getAllDocuments()
    setTrees(docs?.map((doc => doc?.getSchemaTree() || undefined)))
  }, [engine])

  console.log("刷新 PreviewRender", trees)

  return (
    <VirtualForm>
      {
        trees?.map((tree, index) => {
          return (
            tree
              ? <ComponentRender
                key={index}
                components={components}
                //controllerFactories={controllerFactories}
                schema={tree}
              />
              : <Fragment key={index}></Fragment>
          )
        })
      }
    </VirtualForm>
  )
})
import { ComponentRender, } from "@rxdrag/react-runner"
import { IReactComponents } from "@rxdrag/react-shared"
import { INodeSchema } from "@rxdrag/schema"
import { memo, useEffect, useState } from "react"
import { ControllerFactory } from "@rxdrag/minions-runtime-react"
import { useDesignerEngine } from "@rxdrag/react-core"

export const PagePreview = memo((
  props: {
    components: IReactComponents
    controllers?: ControllerFactory,
  }
) => {
  const { components, controllers } = props
  const [tree, setTree] = useState<INodeSchema>()
  const engine = useDesignerEngine()

  // 把各场景组合在一起渲染
  useEffect(() => {
    const docs = engine?.getAllDocuments()
    const tr: INodeSchema = {
      componentName: "Fragment",
      children: []
    }
    for (const doc of docs || []) {
      const subTree = doc?.getSchemaTree()
      if (subTree) {
        tr.children?.push(subTree)
      }
    }
    setTree(tr)
  }, [engine])

  console.log("刷新 PreviewRender", tree)

  return (
    tree
      ? <ComponentRender
        components={components}
        //controllerFactories={controllerFactories}
        schema={tree}
      />
      : <></>
  )
})
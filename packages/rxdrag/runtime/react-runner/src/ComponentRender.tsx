import { INodeSchema } from "@rxdrag/schema"
import { memo, useEffect, useState } from "react"
import { ComponentView, IComponentRenderSchema } from "./ComponentView"
import { transToRenderSchema } from "./transform"
import { IFieldMeta } from "@rxdrag/fieldy-schema"
import { IBindParams } from "./interfaces"
import { IComponents } from "@rxdrag/react-shared"
import { ControllerFactories, RuntimeRoot } from "./RuntimeRoot"
import { ILocalesManager } from "@rxdrag/locales"

export const ComponentRender = memo((props: {
  root: INodeSchema,
  components: IComponents | undefined
  controllerFactories?: ControllerFactories,
  localesManager?: ILocalesManager,//@@ 暂时未用
}) => {
  const { root, components, controllerFactories } = props
  const [node, setNode] = useState<IComponentRenderSchema>()
  useEffect(() => {
    if (root) {
      setNode(transToRenderSchema(root as INodeSchema<IFieldMeta<IBindParams> | undefined>))
    } else {
      setNode(undefined)
    }
  }, [root])
  console.log("刷新 ComponentRender", node)

  return (
    node ? <RuntimeRoot
      components={components}
      schema={node}
      controllerFactories={controllerFactories}
    >
      {node && <ComponentView node={node} />}
    </RuntimeRoot>
      : <></>
  )
})
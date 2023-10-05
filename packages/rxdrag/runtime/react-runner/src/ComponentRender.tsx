import { INodeSchema } from "@rxdrag/schema"
import { memo, useEffect, useState } from "react"
import { ComponentView, IComponentRenderSchema } from "./ComponentView"
import { transToRenderSchema } from "./transform"
import { IFieldMeta } from "@rxdrag/fieldy"
import { IReactComponents } from "@rxdrag/react-shared"
import { RuntimeRoot } from "./RuntimeRoot"
import { ILocalesManager } from "@rxdrag/locales"

export const ComponentRender = memo((props: {
  schema: INodeSchema,
  components: IReactComponents | undefined
  //controllerFactories?: ControllerFactories,
  localesManager?: ILocalesManager,//@@ 暂时未用
}) => {
  const { schema, components } = props
  const [node, setNode] = useState<IComponentRenderSchema>()
  useEffect(() => {
    if (schema) {
      setNode(transToRenderSchema(schema as INodeSchema<IFieldMeta | undefined>))
    } else {
      setNode(undefined)
    }
  }, [schema])

  return (
    node ? <RuntimeRoot
      components={components}
      schema={node}
      //controllerFactories={controllerFactories}
    >
      {node && <ComponentView node={node} />}
    </RuntimeRoot>
      : <></>
  )
})
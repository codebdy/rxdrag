import { INodeSchema } from "@rxdrag/schema"
import { memo, useEffect, useState } from "react"
import { ComponentView, IComponentRenderSchema } from "./ComponentView"
import { transToRenderSchema } from "./transform"
import { IFieldMeta } from "@rxdrag/fieldy"
import { IReactComponents } from "@rxdrag/react-shared"
import { ILocalesManager } from "@rxdrag/locales"
import { PreviewComponentsContext } from "./contexts"
import { LogicFlowOptions, LogicflowRuntime } from "./LogicflowRuntime"


export const ComponentRender = memo((props: {
  schema: INodeSchema,
  components: IReactComponents | undefined
  //controllerFactories?: ControllerFactories,
  localesManager?: ILocalesManager,//@@ 暂时未用
  logicflowOptions?: LogicFlowOptions,
}) => {
  const { schema, components, logicflowOptions } = props

  const [node, setNode] = useState<IComponentRenderSchema>()
  useEffect(() => {
    if (schema) {
      setNode(transToRenderSchema(schema as INodeSchema<IFieldMeta | undefined>))
    } else {
      setNode(undefined)
    }
  }, [schema])

  return (
    node
      ? <LogicflowRuntime
        schema={node}
        {...logicflowOptions}
      >
        <PreviewComponentsContext.Provider
          value={components || {}}
        >
          {node && <ComponentView node={node} />}
        </PreviewComponentsContext.Provider>
      </LogicflowRuntime>
      : <></>
  )
})
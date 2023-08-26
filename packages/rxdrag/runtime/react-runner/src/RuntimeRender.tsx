import { Fieldy, VirtualForm } from "@rxdrag/react-fieldy"
import { IReactComponents } from "@rxdrag/react-shared"
import { INodeSchema } from "@rxdrag/schema"
import { memo } from "react"
import { ControllerFactories } from "./RuntimeRoot"
import { ComponentRender } from "./ComponentRender"

export const RuntimeRender = memo((
  props: {
    components: IReactComponents
    controllerFactories: ControllerFactories,
    schema?: INodeSchema
  }
) => {
  const { components, controllerFactories, schema } = props

  console.log("运行", schema)

  return (
    <Fieldy>
      <VirtualForm>
        {
          schema && <ComponentRender
            root={schema}
            components={components}
            controllerFactories={controllerFactories}
          />
        }
      </VirtualForm>
    </Fieldy>
  )
})
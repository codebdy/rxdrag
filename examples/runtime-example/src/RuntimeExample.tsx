import { memo } from "react"
import { Fieldy, VirtualForm } from "@rxdrag/react-fieldy"
import { ComponentRender } from "@rxdrag/react-runner"
import schema from "./data.json"
import { controllerFactories } from "./controlles"
import { usePredefinedComponents } from "./usePredefinedComponents"

export const RuntimeExample = memo((
) => {
  const components = usePredefinedComponents()
  return (
    <Fieldy>
      <VirtualForm>
        <ComponentRender
          components={components}
          controllerFactories={controllerFactories}
          schema={schema}
        />
      </VirtualForm>
    </Fieldy>
  )
})
import { IReactComponents } from "@rxdrag/react-shared"
import React, { memo, useEffect } from "react"
import { useState } from "react"
import { PreviewComponentsContext, ControllersContext, ControllerEngineContext } from "../contexts"
import { ControllerEngine } from "./ControllerEngine"
import { useLogicFlowContext } from "../hooks/useLogicFlowContext"
import { IComponentRenderSchema } from "../ComponentView"
import { ControllerFactory } from "@rxdrag/minions-runtime-react"
import { useControllers } from "../hooks"


export const LogicflowRuntime = memo((props: {
  components?: IReactComponents,
  children: React.ReactNode,
  schema: IComponentRenderSchema,
  controllerFactories?: Record<string, ControllerFactory>,
}) => {
  const { components = {}, children, schema } = props
  const [controllerEngine, setControllerEngine] = useState<ControllerEngine>()
  const logicFlowContext = useLogicFlowContext();
  const parentControllers = useControllers()

  useEffect(() => {
    const rtEngine = new ControllerEngine(schema, {}, parentControllers)
    setControllerEngine(rtEngine)
    return () => {
      rtEngine.destroy()
    }
  }, [parentControllers, schema])

  return (
    controllerEngine ?
      <ControllerEngineContext.Provider value={controllerEngine}>
        <ControllersContext.Provider value={controllerEngine?.controllers || {}}>
          <PreviewComponentsContext.Provider value={components}>
            {
              children
            }
          </PreviewComponentsContext.Provider>
        </ControllersContext.Provider>
      </ControllerEngineContext.Provider>
      : <>can not create run time engine</>
  )
})
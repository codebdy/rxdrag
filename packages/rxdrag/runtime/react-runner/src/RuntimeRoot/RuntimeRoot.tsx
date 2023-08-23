import { IReactComponents } from "@rxdrag/react-shared"
import React, { memo, useEffect } from "react"
import { useState } from "react"
import { PreviewComponentsContext, ControllersContext, RuntimeEngineContext } from "../contexts"
import { ControllerFactories, RuntimeEngine } from "./RuntimeEngine"
import { useLogicFlowContext } from "../hooks/useLogicFlowContext"
import { IComponentRenderSchema } from "../ComponentView"
import { LOGICFLOW_TYPE_NAME, LogicFlowControllerFactory, SCRIPT_TYPE_NAME, ScriptControllerFactory } from "@rxdrag/minions-runtime-react"

export const RuntimeRoot = memo((props: {
  components?: IReactComponents,
  children: React.ReactNode,
  schema: IComponentRenderSchema,
  controllerFactories?: ControllerFactories,
}) => {
  const { components = {}, children, schema, controllerFactories } = props
  const [runtimeEngine, setRuntimeEngine] = useState<RuntimeEngine>()
  const logicFlowContext = useLogicFlowContext();

  useEffect(() => {
    const defaultFactories = {
      [LOGICFLOW_TYPE_NAME]: LogicFlowControllerFactory,
      [SCRIPT_TYPE_NAME]: ScriptControllerFactory
    }
    const rtEngine = new RuntimeEngine(schema, { ...defaultFactories, ...controllerFactories })
    setRuntimeEngine(rtEngine)

    return () => {
      rtEngine.destroy()
    }
  }, [controllerFactories, logicFlowContext, schema])

  return (
    runtimeEngine ?
      <RuntimeEngineContext.Provider value={runtimeEngine}>
        <ControllersContext.Provider value={runtimeEngine?.globalControllers || {}}>
          <PreviewComponentsContext.Provider value={components}>
            {
              children
            }
          </PreviewComponentsContext.Provider>
        </ControllersContext.Provider>
      </RuntimeEngineContext.Provider>
      : <>can not create run time engine</>
  )
})
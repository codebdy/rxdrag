import { IReactComponents } from "@rxdrag/react-shared"
import React, { memo, useEffect } from "react"
import { useState } from "react"
import { PreviewComponentsContext, ControllersContext, RuntimeEngineContext } from "../contexts"
import { RuntimeEngine } from "./RuntimeEngine"
import { useLogicFlowContext } from "../hooks/useLogicFlowContext"
import { IComponentRenderSchema } from "../ComponentView"


export const RuntimeRoot = memo((props: {
  components?: IReactComponents,
  children: React.ReactNode,
  schema: IComponentRenderSchema,
  //controllerFactories?: ControllerFactories,
}) => {
  const { components = {}, children, schema } = props
  const [runtimeEngine, setRuntimeEngine] = useState<RuntimeEngine>()
  const logicFlowContext = useLogicFlowContext();

  useEffect(() => {
    const rtEngine = new RuntimeEngine(schema, {})
    setRuntimeEngine(rtEngine)

    return () => {
      rtEngine.destroy()
    }
  }, [logicFlowContext, schema])

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
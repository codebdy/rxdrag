import { IComponents } from "@rxdrag/react-shared"
import React, { useEffect } from "react"
import { useCallback, useMemo, useState } from "react"
import { ControllersContext, PreviewComponentsContext, RuntimeEngineContext } from "../contexts"
import { IComponentsParams } from "../interfaces"
import { ILocalesManager } from "@rxdrag/locales"
import { ControllerFactories, RuntimeEngine } from "./RuntimeEngine"
import { useLogicFlowContext } from "../hooks/useLogicFlowContext"
import { IComponentRenderSchema } from "../ComponentView"
import { LOGICFLOW_TYPE_NAME, LogicFlowControllerFactory, SCRIPT_TYPE_NAME, ScriptControllerFactory } from "@rxdrag/minions-runtime-react"

export const RuntimeRoot = (props: {
  components?: IComponents,
  children: React.ReactNode,
  schema?: IComponentRenderSchema,
  localesManager?: ILocalesManager,
  controllerFactories?: ControllerFactories,
}) => {
  const { components: initalComponents, children, schema, controllerFactories } = props
  const [runtimeEngine, setRuntimeEngine] = useState<RuntimeEngine>()
  const [components, setComponents] = useState<IComponents>({})
  const logicFlowContext = useLogicFlowContext();
  const handleRegister = useCallback((...components: IComponents[]) => {
    for (const com of components) {
      setComponents(coms => ({ ...coms, ...com }))
    }
  }, [])
  const params: IComponentsParams = useMemo(() => {
    return {
      components: { ...initalComponents, ...components },
      registerComponents: handleRegister
    }
  }, [components, handleRegister, initalComponents])


  useEffect(() => {
    const defaultFactories = {
      [LOGICFLOW_TYPE_NAME]: LogicFlowControllerFactory,
      [SCRIPT_TYPE_NAME]: ScriptControllerFactory
    }
    controllerFactories && setRuntimeEngine(new RuntimeEngine(schema, { ...defaultFactories, ...controllerFactories }, logicFlowContext))
  }, [controllerFactories, logicFlowContext, schema])

  return (
    <RuntimeEngineContext.Provider value={runtimeEngine}>
      <ControllersContext.Provider value={runtimeEngine?.globalControllers || {}}>
        <PreviewComponentsContext.Provider value={params}>
          {
            children
          }
        </PreviewComponentsContext.Provider>
      </ControllersContext.Provider>
    </RuntimeEngineContext.Provider>
  )
}
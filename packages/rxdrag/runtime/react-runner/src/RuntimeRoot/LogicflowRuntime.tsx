import React, { memo, useEffect } from "react"
import { useState } from "react"
import { ControllerEngineContext } from "../contexts"
import { ControllerEngine } from "./ControllerEngine"
import { useLogicFlowContext } from "../hooks/useLogicFlowContext"
import { IComponentRenderSchema } from "../ComponentView"
import { ControllerFactory, predefinedControllerFactories } from "@rxdrag/minions-runtime-react"
import { useControllers } from "../hooks"
import { ILogicFlowDefine, IScriptDefine } from "@rxdrag/minions-schema"

export const LogicflowRuntime = memo((props: {
  children: React.ReactNode,
  schema: IComponentRenderSchema,
  controllerFactories?: Record<string, ControllerFactory>,
  flows?: ILogicFlowDefine[],
  fxFlows?: ILogicFlowDefine[],
  scripts?: IScriptDefine[],
  fxScripts?: IScriptDefine[],
}) => {
  const { children, schema, controllerFactories } = props
  const [controllerEngine, setControllerEngine] = useState<ControllerEngine>()
  const logicFlowContext = useLogicFlowContext();
  const parentControllers = useControllers()

  useEffect(() => {
    const rtEngine = new ControllerEngine(
      schema, { ...predefinedControllerFactories, ...controllerFactories },
      parentControllers)
    setControllerEngine(rtEngine)
    return () => {
      rtEngine.destroy()
    }
  }, [controllerFactories, parentControllers, schema])

  return (
    controllerEngine ?
      <ControllerEngineContext.Provider value={controllerEngine}>
        {
          children
        }
      </ControllerEngineContext.Provider>
      : <>can not create run time engine</>
  )
})
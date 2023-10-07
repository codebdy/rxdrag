import React, { memo, useEffect } from "react"
import { useState } from "react"
import { ControllerEngineContext } from "../contexts"
import { ControllerEngine } from "./ControllerEngine"
import { useLogicFlowContext } from "../hooks/useLogicFlowContext"
import { IComponentRenderSchema } from "../ComponentView"
import { ControllerFactory } from "@rxdrag/minions-runtime-react"
import { useControllers } from "../hooks"

export const LogicflowRuntime = memo((props: {
  ownerId: string,
  children: React.ReactNode,
  schema: IComponentRenderSchema,
  controllerFactories?: Record<string, ControllerFactory>,
}) => {
  const { children, schema } = props
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
        {
          children
        }
      </ControllerEngineContext.Provider>
      : <>can not create run time engine</>
  )
})
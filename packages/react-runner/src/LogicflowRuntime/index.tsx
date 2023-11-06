import React, { memo, useEffect, useMemo, useRef } from "react"
import { useState } from "react"
import { ControllerEngineContext } from "../contexts"
import { ControllerEngine } from "./ControllerEngine"
import { useGetLogicFlowContext } from "../hooks/useGetLogicFlowContext"
import { IComponentRenderSchema } from "../ComponentView"
import { IVariable } from "@rxdrag/minions-schema"
import { useControllerEngine } from "../hooks/useControllerEngine"
import { ControllerReaction, LogicDefines, predefinedReactions } from "@rxdrag/minions-runtime-react"
import { ILogicScope, LogicFlow } from "@rxdrag/minions-runtime"
import { ScriptRuntime } from "./script/ScriptRuntime"
import { useParams } from "react-router-dom"

export type LogicFlowOptions = {
  ownerId?: string,
  reactions?: Record<string, ControllerReaction>,
  variables?: IVariable[],
  logicDefines?: LogicDefines,
  expVariables?: Record<string, unknown>,
  context?: unknown,
}

export const LogicflowRuntime = memo((props: {
  children: React.ReactNode,
  schema: IComponentRenderSchema,
  scropeValue?: unknown,
  parentValue?: unknown,
  scropeIndex?: number,
} & LogicFlowOptions) => {
  const { children, schema, ownerId, reactions, variables, scropeValue,parentValue, scropeIndex, logicDefines, expVariables, context } = props
  const logicScope: ILogicScope = useMemo(() => {
    return {
      value: scropeValue,
      index: scropeIndex,
      parent: parentValue,
    }
  }, [parentValue, scropeIndex, scropeValue])
  const [controllerEngine, setControllerEngine] = useState<ControllerEngine | null>(null)
  const engineRef = useRef(controllerEngine)
  engineRef.current = controllerEngine
  const urlParams = useParams()
  const urlParamsRef = useRef(urlParams)
  urlParamsRef.current = urlParams
  const parent = useControllerEngine()

  useEffect(() => {
    const rtEngine = new ControllerEngine(
      schema,
    )
    engineRef.current?.destroy()
    setControllerEngine(rtEngine)
  }, [schema])

  useEffect(() => {
    return () => {
      engineRef.current?.destroy()
    }
  }, [])

  const getLogicFlowContext = useGetLogicFlowContext();

  useEffect(() => {
    if (controllerEngine) {
      controllerEngine.init(
        {
          parent,
          variableMetas: variables,
          reactions: { ...predefinedReactions, ...parent?.reactions, ...reactions },
          logicDefines: {
            flows: [...logicDefines?.flows || [], ...parent?.logicDefines?.flows || []],
            scripts: [...logicDefines?.scripts || [], ...parent?.logicDefines?.scripts || []],
            fxFlows: [...logicDefines?.fxFlows || [], ...parent?.logicDefines?.fxFlows || []],
            fxScripts: [...logicDefines?.fxScripts || [], ...parent?.logicDefines?.fxScripts || []],
          },
          logicScope,
          expVariables: { ...parent?.expVariables || {}, ...expVariables || {}, }
        }
      )
      const flowRuntimes = controllerEngine?.logicDefines?.flows?.filter(flow => flow.ownerId === ownerId)?.map(flowMeta => {
        return new LogicFlow(flowMeta, getLogicFlowContext(controllerEngine, context))
      })
      const scriptRuntime = new ScriptRuntime(controllerEngine, { urlParams: urlParamsRef.current }, ownerId)
      const controllers = controllerEngine?.selfControllers || {}
      for (const name of Object.keys(controllers)) {
        controllers[name]?.initEvent()
      }

      return () => {
        flowRuntimes?.forEach(flow => flow.destroy())
        scriptRuntime.dispose()
      }
    }
  }, [context, controllerEngine, expVariables, getLogicFlowContext, logicDefines?.flows, logicDefines?.fxFlows, logicDefines?.fxScripts, logicDefines?.scripts, logicScope, ownerId, parent, reactions, variables])

  return (
    controllerEngine ?
      <ControllerEngineContext.Provider value={controllerEngine}>
        {
          children
        }
      </ControllerEngineContext.Provider>
      : children
  )
})
import React, { memo, useEffect, useMemo, useRef } from "react"
import { useState } from "react"
import { ControllerEngineContext } from "../contexts"
import { ControllerEngine } from "./ControllerEngine"
import { useLogicFlowContext } from "../hooks/useLogicFlowContext"
import { IComponentRenderSchema } from "../ComponentView"
import { IVariable } from "@rxdrag/minions-schema"
import { useControllerEngine } from "../hooks/useControllerEngine"
import { ControllerReaction, LogicDefines, predefinedReactions } from "@rxdrag/minions-runtime-react"
import { ILoopScope, LogicFlow } from "@rxdrag/minions-runtime"
import { ScriptRuntime } from "./script/ScriptRuntime"
import { useParams } from "react-router-dom"

export type LogicFlowOptions = {
  ownerId?: string,
  reactions?: Record<string, ControllerReaction>,
  variables?: IVariable[],
  logicDefines?: LogicDefines,
  expVariables?: Record<string, unknown>,
}

export const LogicflowRuntime = memo((props: {
  children: React.ReactNode,
  schema: IComponentRenderSchema,
  loopRow?: unknown,
  loopIndex?: number,
} & LogicFlowOptions) => {
  const { children, schema, ownerId, reactions, variables, loopRow, loopIndex, logicDefines, expVariables } = props

  const loopScope: ILoopScope = useMemo(() => {
    return {
      value: loopRow,
      index: loopIndex,
    }
  }, [loopIndex, loopRow])
  const [controllerEngine, setControllerEngine] = useState<ControllerEngine | null>(null)
  const engineRef = useRef(controllerEngine)
  engineRef.current = controllerEngine
  const urlParams = useParams()

  const parent = useControllerEngine()

  useEffect(() => {
    if (logicDefines || parent) {
      const rtEngine = new ControllerEngine(
        schema,
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
          loopScope,
          expVariables: { ...parent?.expVariables || {}, ...expVariables || {}, }
        }
      )
      engineRef.current?.destroy()
      setControllerEngine(rtEngine)
    }
  }, [expVariables, logicDefines, loopScope, parent, reactions, schema, variables])

  useEffect(() => {
    return () => {
      engineRef.current?.destroy()
    }
  }, [])

  const logicFlowContext = useLogicFlowContext(controllerEngine);

  useEffect(() => {
    if (controllerEngine?.controllers) {
      const flowRuntimes = controllerEngine?.logicDefines?.flows?.filter(flow => flow.ownerId === ownerId)?.map(flowMeta => {
        return new LogicFlow(flowMeta, logicFlowContext)
      })

      return () => {
        flowRuntimes?.forEach(flow => flow.destroy())
      }
    }
  }, [controllerEngine, logicFlowContext, ownerId])

  useEffect(() => {
    if (controllerEngine?.logicDefines?.scripts?.length && controllerEngine) {
      const scriptRuntim = new ScriptRuntime(controllerEngine, { urlParams }, ownerId)
      return () => {
        scriptRuntim.dispose()
      }
    }
  }, [controllerEngine, ownerId, urlParams])

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
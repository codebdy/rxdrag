import { IReactContext, IVariableContext } from "@rxdrag/minions-runtime-react";
import { useForm } from "@rxdrag/react-fieldy";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IExpContext, IFxContext, ILoopScopeContext } from "@rxdrag/minions-runtime";
import { ControllerEngine } from "../LogicflowRuntime/ControllerEngine";

export type MergedLogicFlowContext = IReactContext & IVariableContext & IFxContext & ILoopScopeContext &IExpContext

export function useLogicFlowContext(engine: ControllerEngine | null) {
  const navigate = useNavigate()
  const form = useForm()
  const urlParams = useParams()
  const logicFlowContext: MergedLogicFlowContext = useMemo(() => ({
    controllers: engine?.controllers,
    navigate,
    form,
    urlParams,
    reactions: engine?.reactions,
    variableController: engine?.variableController,
    fxMetas: engine?.logicDefines?.fxFlows,
    loopScope: engine?.loopScope,
    
  }), [engine, form, navigate, urlParams])

  return logicFlowContext
}
import { IReactContext, IVariableContext } from "@rxdrag/minions-runtime-react";
import { useForm } from "@rxdrag/react-fieldy";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IExpContext, IFxContext, ILogicScopeContext } from "@rxdrag/minions-runtime";
import { ControllerEngine } from "../LogicflowRuntime/ControllerEngine";

export type MergedLogicFlowContext = IReactContext & IVariableContext & IFxContext & ILogicScopeContext & IExpContext


export function useGetLogicFlowContext() {
  const navigate = useNavigate()
  const form = useForm()
  const urlParams = useParams()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLogicFlowContext = useCallback((engine: ControllerEngine | null, context: any) => {
    return {
      controllers: engine?.controllers,
      navigate,
      form,
      urlParams,
      reactions: engine?.reactions,
      variableController: engine?.variableController,
      fxMetas: engine?.logicDefines?.fxFlows,
      logicScope: engine?.logicScope,
      ...context

    }
  }, [form, navigate, urlParams])

  return getLogicFlowContext
}
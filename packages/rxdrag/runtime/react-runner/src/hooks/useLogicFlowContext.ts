import { IFieldyLogicFlowContext } from "@rxdrag/fieldy-minions-activities";
import { IReactContext, IVariableContext, predefinedReactions } from "@rxdrag/minions-runtime-react";
import { useForm } from "@rxdrag/react-fieldy";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IFxContext } from "@rxdrag/minions-runtime";
import { ControllerEngine } from "../LogicflowRuntime/ControllerEngine";

export type MergedLogicFlowContext = IFieldyLogicFlowContext & IReactContext & IVariableContext & IFxContext

export function useLogicFlowContext(engine?: ControllerEngine) {
  const navigate = useNavigate()
  const form = useForm()
  const urlParams = useParams()
  const logicFlowContext: MergedLogicFlowContext = useMemo(() => ({
    controllers: engine?.controllers,
    navigate,
    form,
    urlParams,
    reactions: { ...predefinedReactions, ...engine?.reactions },
    variableController: engine?.variableController,
    fxFlows: engine?.fxFlows,
  }), [engine, form, navigate, urlParams])

  return logicFlowContext
}
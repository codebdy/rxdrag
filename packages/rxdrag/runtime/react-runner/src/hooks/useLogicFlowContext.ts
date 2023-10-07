import { IFieldyLogicFlowContext } from "@rxdrag/fieldy-minions-activities";
import { ControllerReaction, IReactContext, IVariableContext, predefinedReactions } from "@rxdrag/minions-runtime-react";
import { useForm } from "@rxdrag/react-fieldy";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ControllerEngine } from "../RuntimeRoot";

export type MergedLogicFlowContext = IFieldyLogicFlowContext & IReactContext & IVariableContext

export function useLogicFlowContext(engine?: ControllerEngine, reactions?: Record<string, ControllerReaction>) {
  const navigate = useNavigate()
  const form = useForm()
  const urlParams = useParams()
  const logicFlowContext: MergedLogicFlowContext = useMemo(() => ({
    controllers: engine?.controllers,
    navigate,
    form,
    urlParams,
    reactions: { ...predefinedReactions, ...reactions },
    variableController: engine?.variableController,
  }), [engine, form, navigate, reactions, urlParams])

  return logicFlowContext
}
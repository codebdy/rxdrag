import { IFieldyLogicFlowContext } from "@rxdrag/fieldy-minions-activities";
import { IRouteToContext, IVariableContext } from "@rxdrag/minions-runtime-react";
import { useForm } from "@rxdrag/react-fieldy";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ControllerEngine } from "../RuntimeRoot";

export type LogicFlowContext = IFieldyLogicFlowContext & IRouteToContext & IVariableContext

export function useLogicFlowContext(engine?: ControllerEngine) {
  const navigate = useNavigate()
  const form = useForm()
  const urlParams = useParams()
  const logicFlowContext: LogicFlowContext = useMemo(() => ({
    navigate,
    form,
    urlParams,
    variableController: engine?.variableController,
  }), [engine?.variableController, form, navigate, urlParams])

  return logicFlowContext
}
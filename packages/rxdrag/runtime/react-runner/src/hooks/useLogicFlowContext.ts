import { IFieldyLogicFlowContext } from "@rxdrag/fieldy-minions-activities";
import { IRouteToContext, IVariableContext } from "@rxdrag/minions-runtime-react";
import { useForm } from "@rxdrag/react-fieldy";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export type LogicFlowContext = IFieldyLogicFlowContext & IRouteToContext & IVariableContext 

export function useLogicFlowContext() {
  const navigate = useNavigate()
  const form = useForm()
  const logicFlowContext = useMemo(() => ({ navigate, form }), [form, navigate])

  return logicFlowContext
}
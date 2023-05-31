import { useContext } from "react";
import { LogicFlowContext } from "../contexts";

export function useLogicFlowContext() {
  return useContext(LogicFlowContext)
}
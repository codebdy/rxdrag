import { useContext } from "react";
import { LogicFlowContext } from "../contexts";

export function useFxFlowMetas() {
  return useContext(LogicFlowContext)?.fxFlowMetas
}
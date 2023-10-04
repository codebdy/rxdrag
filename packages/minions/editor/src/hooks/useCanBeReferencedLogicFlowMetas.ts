import { useContext } from "react";
import { CanBeReferencedLogicFlowMetasContext } from "../contexts";

export function useCanBeReferencedLogicFlowMetas() {
  return useContext(CanBeReferencedLogicFlowMetasContext)
}
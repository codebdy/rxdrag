import { useContext } from "react";
import { FxFlowMetasContext } from "../contexts";

export function useFxFlowMetas() {
  return useContext(FxFlowMetasContext)
}
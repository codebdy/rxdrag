import { useCallback } from "react";
import { useCanBeReferencedLogicFlowMetas } from "./useCanBeReferencedLogicFlowMetas";

export function useGetLogicFlowMeta() {
  const logicFlowMetas = useCanBeReferencedLogicFlowMetas()
  const getLogicFlowMeta = useCallback((id: string) => {
    return logicFlowMetas.find(meta => meta.id === id)
  }, [logicFlowMetas])

  return getLogicFlowMeta;
}
import { ILogicFlowDefinition } from "@rxdrag/minions-schema";
import { useCallback } from "react";

export function useGetLogicFlowMeta() {
  const logicFlowMetas:ILogicFlowDefinition[] = [];//useCanBeReferencedLogicFlowMetas()
  const getLogicFlowMeta = useCallback((id: string) => {
    return logicFlowMetas.find(meta => meta.id === id)
  }, [logicFlowMetas])

  return getLogicFlowMeta;
}
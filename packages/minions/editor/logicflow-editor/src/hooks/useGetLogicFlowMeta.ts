import { ILogicFlowDefine } from "@rxdrag/minions-schema";
import { useCallback } from "react";
import { useCanBeReferencedLogicFlowMetas } from "./useCanBeReferencedLogicFlowMetas";

export function useGetLogicFlowMeta() {
  const logicFlowMetas:ILogicFlowDefine[] = useCanBeReferencedLogicFlowMetas();

  const getLogicFlowMeta = useCallback((id: string) => {
    return logicFlowMetas.find(meta => meta.id === id)
  }, [logicFlowMetas])

  return getLogicFlowMeta;
}
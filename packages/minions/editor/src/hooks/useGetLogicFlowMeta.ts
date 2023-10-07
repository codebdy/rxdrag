import { ILogicFlowDefine } from "@rxdrag/minions-schema";
import { useCallback } from "react";
import { useFxFlowMetas } from "./useFxFlowMetas";

export function useGetLogicFlowMeta() {
  const logicFlowMetas:ILogicFlowDefine[] = useFxFlowMetas();

  const getLogicFlowMeta = useCallback((id: string) => {
    return logicFlowMetas.find(meta => meta.id === id)
  }, [logicFlowMetas])

  return getLogicFlowMeta;
}
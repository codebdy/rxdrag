import { useCallback } from "react";
import { IActivityDefine, ActivityType, IPortDefine, ILogicFlowConfig } from "@rxdrag/minions-schema";
import { useGetLogicFlowMeta } from "./useGetLogicFlowMeta";

export function useGetLogicFlowNodePorts() {
  const getLogicFlowMeta = useGetLogicFlowMeta();
  
  const getLogicFlowPorts = useCallback((meta: IActivityDefine<ILogicFlowConfig>, group: 'in' | 'out') => {
    const activityType = group === "in" ? ActivityType.Start : ActivityType.End
    const logMeta = getLogicFlowMeta(meta.config?.logicFlowId || "")
    const ports: IPortDefine[] | undefined = logMeta?.nodes?.filter(activityMeta => activityMeta.type === activityType)?.map(activityMeta => ({ id: activityMeta.id, name: activityMeta.activityName || "", label: activityMeta.label }))
    return ports
  }, [getLogicFlowMeta])

  return getLogicFlowPorts
}
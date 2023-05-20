import { useCallback } from "react";
import { IActivityDefine, ActivityType, IPortDefine, ILogicFlowConfig } from "@rxdrag/minions-schema";
import { useGetLogicFlowMeta } from "./useGetLogicFlowMeta";

export function useGetLogicFlowNodePorts() {
  const getLogicFlowMeta = useGetLogicFlowMeta();
  
  const getLogicFlowPorts = useCallback((meta: IActivityDefine<ILogicFlowConfig>, group: 'in' | 'out') => {
    const activityType = group === "in" ? ActivityType.Start : ActivityType.End
    const ports: IPortDefine[] | undefined = getLogicFlowMeta(meta.config?.logicFlowId || "")?.nodes?.filter(activityMeta => activityMeta.type === activityType)?.map(activityMeta => ({ id: activityMeta.id, name: activityMeta.activityName || "", label: activityMeta.label }))

    return ports
  }, [getLogicFlowMeta])

  return getLogicFlowPorts
}
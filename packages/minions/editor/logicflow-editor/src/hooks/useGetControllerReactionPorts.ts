import { useCallback } from "react";
import { useGetControllerMeta } from "./useGetControllerMeta";
import { IActivityDefine, ActivityType, IPortDefine } from "@rxdrag/minions-schema";

export function useGetControllerReactionPorts() {
  const getControllerMeta = useGetControllerMeta()
  const getReactionPorts = useCallback((meta: IActivityDefine, group: 'in' | 'out') => {
    const activityType = group === "in" ? ActivityType.Start : ActivityType.End
    const ports: IPortDefine[] | undefined = getControllerMeta(meta.config?.controllerId || "")?.reactions
      ?.find(activityMeta => activityMeta.id === meta.config?.reactionRef)?.nodes?.filter(activityMeta => activityMeta.type === activityType)?.map(activityMeta => ({ id: activityMeta.id, name: activityMeta.name || "", label: activityMeta.label }))

    return ports
  }, [getControllerMeta])

  return getReactionPorts
}
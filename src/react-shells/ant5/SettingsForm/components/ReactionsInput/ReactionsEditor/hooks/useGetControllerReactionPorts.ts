import { useCallback } from "react";
import { IPortMeta, IReactionMeta, ReactionType } from "runner/minions";
import { useGetControllerMeta } from "./useGetControllerMeta";

export function useGetControllerReactionPorts() {
  const getControllerMeta = useGetControllerMeta()
  const getReactionPorts = useCallback((meta: IReactionMeta, group: 'in' | 'out') => {
    const reactionType = group === "in" ? ReactionType.Start : ReactionType.End
    const ports: IPortMeta[] | undefined = getControllerMeta(meta.config?.controllerId || "")?.reactions
      ?.find(reaction => reaction.id === meta.config?.reactionRef)?.logicMetas?.reactions.filter(reaction => reaction.type === reactionType)?.map(reaction => ({ id: reaction.id, name: reaction.name || "", label: reaction.label }))

    return ports
  }, [getControllerMeta])

  return getReactionPorts
}
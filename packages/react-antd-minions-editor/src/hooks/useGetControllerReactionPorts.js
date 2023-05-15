import { ReactionType } from "@rxdrag/schema";
import { useCallback } from "react";
import { useGetControllerMeta } from "./useGetControllerMeta";
export function useGetControllerReactionPorts() {
    const getControllerMeta = useGetControllerMeta();
    const getReactionPorts = useCallback((meta, group) => {
        const reactionType = group === "in" ? ReactionType.Start : ReactionType.End;
        const ports = getControllerMeta(meta.config?.controllerId || "")?.reactions
            ?.find(reaction => reaction.id === meta.config?.reactionRef)?.logicMetas?.reactions.filter(reaction => reaction.type === reactionType)?.map(reaction => ({ id: reaction.id, name: reaction.name || "", label: reaction.label }));
        return ports;
    }, [getControllerMeta]);
    return getReactionPorts;
}

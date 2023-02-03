import { useCallback } from "react";
import { IReactionNodeMeta, ReactionType } from "runner/reaction/interfaces/metas";

export function useGetNodeHeight() {
  const getNodeHeight = useCallback((nodeMeta: IReactionNodeMeta) => {
    const portCount = Math.max((nodeMeta.inPorts?.length || 0), (nodeMeta.outPorts?.length || 0))
    const effectCount = portCount > 2 ? portCount - 2 : 0
    const extra = nodeMeta.type === ReactionType.ControllerDefaultReaction || nodeMeta.type === ReactionType.ControllerReaction ? 20 : 0
    return effectCount * 16 + 40 + extra
  }, [])

  return getNodeHeight
}
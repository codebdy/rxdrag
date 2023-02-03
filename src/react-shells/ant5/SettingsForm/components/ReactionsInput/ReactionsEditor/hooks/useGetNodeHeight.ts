import { useCallback } from "react";
import { IConfigMeta, IReactionNodeMeta, ReactionType } from "runner/reaction/interfaces/metas";

export function useGetNodeHeight() {
  const getNodeHeight = useCallback((nodeMeta: IReactionNodeMeta<IConfigMeta>) => {
    const portCount = Math.max((nodeMeta.inPorts?.length || 0), (nodeMeta.outPorts?.length || 0))
    const effectCount = portCount > 2 ? portCount - 2 : 0
    const hasExtra = nodeMeta.type === ReactionType.ControllerDefaultReaction || nodeMeta.type === ReactionType.ControllerReaction ||(nodeMeta.config?.fieldName)
    const extra = hasExtra ? 16 : 0
    return effectCount * 16 + 32 + extra
  }, [])

  return getNodeHeight
}
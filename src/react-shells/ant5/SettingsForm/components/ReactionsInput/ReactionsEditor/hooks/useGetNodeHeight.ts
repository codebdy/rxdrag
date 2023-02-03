import { useCallback } from "react";
import { IReactionNodeMeta } from "runner/reaction/interfaces/metas";

export function useGetNodeHeight() {
  const getNodeHeight = useCallback((nodeMeta: IReactionNodeMeta) => {
    const portCount = Math.max((nodeMeta.inPorts?.length || 0), (nodeMeta.outPorts?.length || 0))
    const effectCount = portCount > 2 ? portCount - 2 : 0
    return effectCount * 16 + 40
  }, [])

  return getNodeHeight
}
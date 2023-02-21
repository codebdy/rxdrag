import { useCallback } from "react";
import { IConfigMeta, IReactionMeta } from "runner/minions/interfaces/metas";

export function useGetNodeHeight() {
  const getNodeHeight = useCallback((nodeMeta: IReactionMeta<IConfigMeta>, hasSubLabel: boolean) => {
    const portCount = Math.max((nodeMeta.inPorts?.length || 0), (nodeMeta.outPorts?.length || 0))
    const effectCount = portCount > 2 ? portCount - 2 : 0
    const extra = hasSubLabel ? 16 : 0
    return effectCount * 16 + 32 + extra
  }, [])

  return getNodeHeight
}
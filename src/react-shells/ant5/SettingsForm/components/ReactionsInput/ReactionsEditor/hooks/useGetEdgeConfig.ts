import { useCallback } from "react"
import { IInvokeMeta } from "runner/minions/interfaces/metas"

export function useGetEdgeConfig() {

  const getEdgeConfig = useCallback((invakeMeta: IInvokeMeta) => {

    return {
      id: invakeMeta.id,
      shape: "reaction-edge",
      source: {
        cell: invakeMeta.source.nodeId,
        port: invakeMeta.source.portId,
      },
      target: {
        cell: invakeMeta.target.nodeId,
        port: invakeMeta.target.portId,
      },
      zIndex: 0,
    }
  }, [])

  return getEdgeConfig
}

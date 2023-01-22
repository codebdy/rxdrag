import { useCallback } from "react"
import { IInvokeMeta } from "runner/reaction/interfaces/metas"

export function useGetEdgeConfig() {

  const getEdgeConfig = useCallback((invakeMeta: IInvokeMeta) => {

    return {
      shape: "reaction-edge",
      source: {
        cell: invakeMeta.source.nodeId,
        port: invakeMeta.source.port,
      },
      target: {
        cell: invakeMeta.target.nodeId,
        port: invakeMeta.target.port,
      },
      zIndex: 0,
    }
  }, [])

  return getEdgeConfig
}

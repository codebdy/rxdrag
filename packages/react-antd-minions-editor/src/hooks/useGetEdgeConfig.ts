import { ILineDefine } from "@rxdrag/schema"
import { useCallback } from "react"

export function useGetEdgeConfig() {

  const getEdgeConfig = useCallback((invakeMeta: ILineDefine) => {

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

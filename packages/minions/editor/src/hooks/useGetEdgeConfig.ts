import { ILineDefine } from "@rxdrag/minions-schema"
import { useCallback } from "react"

export function useGetEdgeConfig() {

  const getEdgeConfig = useCallback((lineMeta: ILineDefine) => {

    return {
      id: lineMeta.id,
      shape: "reaction-edge",
      source: {
        cell: lineMeta.source.nodeId,
        port: lineMeta.source.portId,
      },
      target: {
        cell: lineMeta.target.nodeId,
        port: lineMeta.target.portId,
      },
      data:{
        meta: lineMeta
      },
    }
  }, [])

  return getEdgeConfig
}

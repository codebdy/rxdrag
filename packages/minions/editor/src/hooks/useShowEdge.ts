import { useCallback } from "react";
import { useGraph } from "./useGraph";
import { ILineDefine } from "@rxdrag/minions-schema";
import { useGetEdgeConfig } from "./useGetEdgeConfig";

export function useShowEdge() {
  const graph = useGraph()
  const getEdgeConfig = useGetEdgeConfig()

  const showEdge = useCallback((lineMeta: ILineDefine) => {
    if (!graph) {
      return
    }
    const oldEdges = graph.getEdges()
    const graphEdge = oldEdges.find(edge => edge.id === lineMeta.id)
    if (!graphEdge) {
      const edge = graph.createEdge(getEdgeConfig(lineMeta))
      graph.addEdge(edge)
      return edge
    }
    return graphEdge
  }, [graph, getEdgeConfig])

  return showEdge
}
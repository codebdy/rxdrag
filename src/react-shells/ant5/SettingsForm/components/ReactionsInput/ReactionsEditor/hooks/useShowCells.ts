import { useEffect } from "react";
import { useGetNodeConfig } from "./useGetNodeConfig";
import { useGetEdgeConfig } from "./useGetEdgeConfig";
import { useGraph } from "./useGraph";
import { useMetas } from "./useMetas";

export function useShowCells() {
  const graph = useGraph()
  const getNodeConfig = useGetNodeConfig()
  const getEdgeConfig = useGetEdgeConfig()

  const { metas } = useMetas()
  useEffect(() => {
    if (graph) {
      const oldNodes = graph.getNodes()
      const oldEdges = graph.getEdges()
      const oldCells = graph.getCells()
      for (const reactionNode of metas?.reactions || []) {
        const graphNode = oldNodes.find(node => node.id === reactionNode.id)
        //更新
        if (graphNode && reactionNode.x6Node) {
          graphNode.setSize(reactionNode.x6Node);
          graphNode.setPosition(reactionNode.x6Node);
        } else {//新建
          const node = graph.createNode(getNodeConfig(reactionNode))
          graph.addNode(node)
        }
      }

      for (const invoke of metas?.invokes || []) {
        const graphEdge = oldEdges.find(edge => edge.id === invoke.id)
        if (!graphEdge) {
          const edge = graph.createEdge(getEdgeConfig(invoke))
          graph.addEdge(edge)
        }
      }

      //删除不存在的
      for (const cell of oldCells) {
        if (![...metas?.reactions || [], ...metas?.invokes || []].find(el => el.id === cell.id)) {
          cell.remove()
        }
      }

    }
  }, [getEdgeConfig, getNodeConfig, graph, metas, metas?.invokes, metas?.reactions])
}
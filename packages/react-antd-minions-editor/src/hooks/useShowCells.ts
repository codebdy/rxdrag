import { useEffect } from "react";
import { useGetNodeConfig } from "./useGetNodeConfig";
import { useGetEdgeConfig } from "./useGetEdgeConfig";
import { useGraph } from "./useGraph";
import { useMetas } from "./useMetas";
import { useUpdateNode } from "./useUpdateNode";

export function useShowCells() {
  const graph = useGraph()
  const getNodeConfig = useGetNodeConfig()
  const getEdgeConfig = useGetEdgeConfig()
  const updateNode = useUpdateNode()

  const { metas } = useMetas()
  useEffect(() => {
    if (graph) {
      const oldNodes = graph.getNodes()
      const oldEdges = graph.getEdges()
      const oldCells = graph.getCells()
      for (const reactionNode of metas?.nodes || []) {
        const graphNode = oldNodes.find(node => node.id === reactionNode.id)
        //更新
        if (graphNode && reactionNode.x6Node) {
          updateNode(graphNode, reactionNode)
        } else {//新建
          const nodeConfig = getNodeConfig(reactionNode)
          const node = graph.createNode(nodeConfig)
          graph.addNode(node)
        }
      }

      for (const invoke of metas?.lines || []) {
        const graphEdge = oldEdges.find(edge => edge.id === invoke.id)
        if (!graphEdge) {
          const edge = graph.createEdge(getEdgeConfig(invoke))
          graph.addEdge(edge)
        }
      }

      //删除不存在的
      for (const cell of oldCells) {
        if (![...metas?.nodes || [], ...metas?.lines || []].find(el => el.id === cell.id)) {
          cell.remove()
        }
      }

    }
  }, [getEdgeConfig, getNodeConfig, graph, metas, metas?.lines, metas?.nodes, updateNode])
}
import { useEffect } from "react";
import { useGetEdgeConfig } from "./useGetEdgeConfig";
import { useGraph } from "./useGraph";
import { useMetas } from "./useMetas";
import { useShowNode } from "./useShowNode";

export function useShowCells() {
  const graph = useGraph()
  const getEdgeConfig = useGetEdgeConfig()
  const showNode = useShowNode()

  const { metas } = useMetas()
  useEffect(() => {
    if (graph) {
      const oldEdges = graph.getEdges()
      const oldCells = graph.getCells()
      //先显示顶级节点
      for (const nodeMeta of metas?.nodes || []) {
        if (!nodeMeta.parentId) {
          showNode(nodeMeta)
        }
      }

      //在显示嵌入节点
      for (const nodeMeta of metas?.nodes || []) {
        if (nodeMeta.parentId) {
          showNode(nodeMeta)
        }
      }

      //构建父子关系
      const nodes = graph.getNodes()
      for (const node of nodes) {
        const parentId = node.getData()?.meta?.parentId
        if (parentId && !node.parent) {
          graph.getCellById(parentId).addChild(node)
        }
      }

      for (const lineMeta of metas?.lines || []) {
        const graphEdge = oldEdges.find(edge => edge.id === lineMeta.id)
        if (!graphEdge) {
          const edge = graph.createEdge(getEdgeConfig(lineMeta))
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
  }, [getEdgeConfig, graph, metas, metas?.lines, metas?.nodes])
}
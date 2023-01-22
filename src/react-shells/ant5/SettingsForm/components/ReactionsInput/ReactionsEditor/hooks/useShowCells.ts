import { useEffect } from "react";
import { useGetNodeConfig } from "./useGetNodeConfig";
import { useEditorState } from "./useEditorState";
import { useGetEdgeConfig } from "./useGetEdgeConfig";

export function useShowCells() {
  const { graph } = useEditorState()
  const getStartNodeConfig = useGetNodeConfig()
  const getEdgeConfig = useGetEdgeConfig()
  
  const { metas } = useEditorState()
  useEffect(() => {
    if (graph) {
      const oldNodes = graph.getNodes()
      const oldEdges = graph.getEdges()
      const oldCells = graph.getCells()
      for (const reactionNode of metas.reactions) {
        const graphNode = oldNodes.find(node => node.id === reactionNode.id)
        //更新
        if (graphNode && reactionNode.x6Node) {
          graphNode.setSize(reactionNode.x6Node);
          graphNode.setPosition(reactionNode.x6Node);
        } else {//新建
          graph.createNode(getStartNodeConfig(reactionNode))
        }
      }

      for(const invoke of metas.invokes){
        const graphEdge = oldEdges.find(edge=>edge.id === invoke.id)
        if(!graphEdge){
          graph.createEdge(getEdgeConfig(invoke))
        }
      }

      //删除不存在的
      for (const cell of oldCells) {
        if (![...metas.reactions, ...metas.invokes].find(el => el.id === cell.id)) {
          cell.remove()
        }
      }

    }
  }, [getEdgeConfig, getStartNodeConfig, graph, metas, metas.invokes, metas.reactions])
}
import { useCallback } from "react";
import { IActivityNode } from "../interfaces";
import { useGraph } from "./useGraph";
import { useUpdateNode } from "./useUpdateNode";
import { useGetNodeConfig } from "./useGetNodeConfig";

export function useShowNode() {
  const graph = useGraph()
  const updateNode = useUpdateNode()
  const getNodeConfig = useGetNodeConfig()
  
  const showNode = useCallback((nodeMeta:IActivityNode) => {
    if(!graph){
      return
    }
    const oldNodes = graph.getNodes()||[]
    const graphNode = oldNodes.find(node => node.id === nodeMeta.id)
    //更新
    if (graphNode && nodeMeta.x6Node) {
      updateNode(graphNode, nodeMeta)
      return graphNode
    } else {//新建
      const nodeConfig = getNodeConfig(nodeMeta)
      const node = graph.createNode(nodeConfig)
      graph.addNode(node)
      return node
    }
  }, [graph, updateNode, getNodeConfig])

  return showNode
}
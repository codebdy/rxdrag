import { ITreeNode } from "@rxdrag/core";
import { useCurrentNode, useGetNode } from "@rxdrag/react-core";
import { useCallback, useMemo } from "react";

export function useNodesOnPath() {
  const currentNode = useCurrentNode()
  const getNode = useGetNode()
  const addParent = useCallback((node: ITreeNode, nodes: ITreeNode[]) => {
    if (node.parentId) {
      const parent = getNode(node.parentId)
      if (parent) {
        nodes.splice(0, 0, parent)
        addParent(parent, nodes)
      }
    }
  }, [getNode])

  const pathNodes = useMemo(() => {
    const nodes: ITreeNode[] = []
    if (currentNode) {
      nodes.push(currentNode)
      addParent(currentNode, nodes)
    }
    return nodes
  }, [addParent, currentNode])

  return pathNodes
}
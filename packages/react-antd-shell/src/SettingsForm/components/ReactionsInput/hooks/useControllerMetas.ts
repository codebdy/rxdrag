import { ITreeNode } from "@rxdrag/core"
import { useGetNode, useCurrentNode } from "@rxdrag/react-core"
import { useCallback, useMemo } from "react"

export function useControllerMetas(){
  const getNode = useGetNode()
  const currentNode = useCurrentNode()
  
  const processNode = useCallback((node: ITreeNode, nodes: ITreeNode[]) => {
    if (node.meta?.["x-controller"]?.enable) {
      nodes.push(node)
    }
    if (node.parentId) {
      const parent = getNode(node.parentId)
      if (parent) {
        processNode(parent, nodes)
      }
    }
  }, [getNode])

  const controllerNodes = useMemo(() => {
    if (currentNode) {
      const nodes: ITreeNode[] = []
      processNode(currentNode, nodes)

      return nodes.reverse().map(node=>node.meta?.["x-controller"])
    }

    return []
  }, [currentNode, processNode])

  return controllerNodes
}
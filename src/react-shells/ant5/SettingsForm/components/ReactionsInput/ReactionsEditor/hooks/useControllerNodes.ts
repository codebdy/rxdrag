import { ITreeNode } from "core"
import { useCurrentNode } from "core-react/hooks/useCurrentNode"
import { useGetNode } from "core-react/hooks/useGetNode"
import { useCallback, useMemo } from "react"

export function useControllerNodes(){
  const getNode = useGetNode()
  const currentNode = useCurrentNode()
  
  const processNode = useCallback((node: ITreeNode, nodes: ITreeNode[]) => {
    if (node.meta?.["x-reactions"]?.enable) {
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

      return nodes.reverse()
    }

    return []
  }, [currentNode, processNode])

  return controllerNodes
}
import { ITreeNode } from "@rxdrag/core"
import { IControllerMeta } from "@rxdrag/minions-runtime-react"
import { useGetNode, useCurrentNode, useTreeNode } from "@rxdrag/react-core"
import { useCallback, useMemo } from "react"

export function useParentControllerMetas() {
  const getNode = useGetNode()
  const currentNode = useCurrentNode()
  const latestNode = useTreeNode(currentNode?.id || "") as ITreeNode<unknown, IControllerMeta> | undefined

  const processNode = useCallback((node: ITreeNode<unknown, IControllerMeta>, nodes: ITreeNode<unknown, IControllerMeta>[]) => {
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

  const controllerNodes: IControllerMeta[] = useMemo(() => {
    if (latestNode) {
      const nodes: ITreeNode<unknown, IControllerMeta>[] = []
      if(latestNode.parentId){
        const parent = getNode(latestNode.parentId)
        parent && processNode(parent, nodes)
      }
      return nodes.map(node => ({ ...node.meta?.["x-controller"] || {}, name: node.meta?.["x-controller"]?.name || node.title })) as IControllerMeta[]
    }

    return []
  }, [getNode, latestNode, processNode])

  return controllerNodes
}
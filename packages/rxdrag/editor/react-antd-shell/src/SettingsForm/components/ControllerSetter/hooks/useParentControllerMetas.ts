import { ITreeNode } from "@rxdrag/core"
import { IControllerMeta } from "@rxdrag/minions-runtime-react"
import { useGetNode, useCurrentNode, useTreeNode } from "@rxdrag/react-core"
import { useCallback, useMemo } from "react"
import { useFillControllerProps } from "./useFillControllerProps"
import { INodeSchema } from "@rxdrag/schema"

export function useParentControllerMetas() {
  const getNode = useGetNode()
  const currentNode = useCurrentNode()
  const latestNode = useTreeNode(currentNode?.id || "") as ITreeNode<unknown, IControllerMeta> | undefined
  const fill = useFillControllerProps();

  const processNode = useCallback((node: ITreeNode<unknown, IControllerMeta>, nodes: ITreeNode<unknown, IControllerMeta>[]) => {
    if (node.meta?.["x-controller"]?.enable) {
      nodes.push(node)
    }
    if (node.parentId) {
      const parent = getNode(node.parentId)
      if (parent) {
        processNode(parent as ITreeNode<unknown, IControllerMeta>, nodes)
      }
    }
  }, [getNode])

  const controllerNodes: IControllerMeta[] = useMemo(() => {
    if (latestNode) {
      const nodes: ITreeNode<unknown, IControllerMeta>[] = []
      if (latestNode.parentId) {
        const parent = getNode(latestNode.parentId)
        parent && processNode(parent as ITreeNode<unknown, IControllerMeta>, nodes)
      }
      return nodes.map(node => {
        const ctlMeta = { ...node.meta?.["x-controller"] || {}, name: node.meta?.["x-controller"]?.name || node.title } as IControllerMeta
        return fill(ctlMeta, node as ITreeNode<INodeSchema<unknown, unknown>, IControllerMeta>)
      })
    }

    return []
  }, [fill, getNode, latestNode, processNode])

  return controllerNodes
}
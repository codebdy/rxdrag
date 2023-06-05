import { ITreeNode } from "@rxdrag/core"
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react"
import { useGetNode, useCurrentNode, useTreeNode } from "@rxdrag/react-core"
import { useCallback, useMemo } from "react"
import { useFillControllerProps } from "./useFillControllerProps"
import { INodeSchema } from "@rxdrag/schema"

export function useParentControllerMetas() {
  const getNode = useGetNode()
  const currentNode = useCurrentNode()
  const latestNode = useTreeNode(currentNode?.id || "") as ITreeNode<unknown, ILogicFlowControllerMeta> | undefined
  const fill = useFillControllerProps();

  const processNode = useCallback((node: ITreeNode<unknown, ILogicFlowControllerMeta>, nodes: ITreeNode<unknown, ILogicFlowControllerMeta>[]) => {
    if (node.meta?.["x-controller"]?.enable) {
      nodes.push(node)
    }
    if (node.parentId) {
      const parent = getNode(node.parentId)
      if (parent) {
        processNode(parent as ITreeNode<unknown, ILogicFlowControllerMeta>, nodes)
      }
    }
  }, [getNode])

  const controllerNodes: ILogicFlowControllerMeta[] = useMemo(() => {
    if (latestNode) {
      const nodes: ITreeNode<unknown, ILogicFlowControllerMeta>[] = []
      if (latestNode.parentId) {
        const parent = getNode(latestNode.parentId)
        parent && processNode(parent as ITreeNode<unknown, ILogicFlowControllerMeta>, nodes)
      }
      return nodes.map(node => {
        const ctlMeta = { ...node.meta?.["x-controller"] || {}, name: node.meta?.["x-controller"]?.name || node.title } as ILogicFlowControllerMeta
        return fill(ctlMeta, node as ITreeNode<INodeSchema<unknown, unknown>, ILogicFlowControllerMeta>)
      })
    }

    return []
  }, [fill, getNode, latestNode, processNode])

  return controllerNodes
}
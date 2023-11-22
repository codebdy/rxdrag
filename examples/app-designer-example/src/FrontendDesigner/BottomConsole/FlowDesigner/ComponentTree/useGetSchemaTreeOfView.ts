import { ITreeNode } from "@rxdrag/core"
import { IFieldMeta } from "@rxdrag/fieldy"
import { IControllerMeta } from "@rxdrag/minions-runtime-react"
import { useGetNode } from "@rxdrag/react-core"
import { useCallback } from "react"
import { ReactionableNode } from "."
import { useAllDocuments } from "../useAllDocuments"

export function useGetSchemaTreeOfView(flowOwnerId?: string) {
  const getNode = useGetNode()
  const docs = useAllDocuments()
  const getReactionableSchemas = useCallback((node: ITreeNode<IFieldMeta, IControllerMeta>) => {
    const isArray = node.meta?.["x-data"]?.type === "array"
    const nodes: ReactionableNode[] = []
    let activeNodes = nodes
    if (node.meta["x-controller"]?.enable) {
      const rNode: ReactionableNode = {
        node: node,
        children: []
      }
      nodes.push(rNode)
      activeNodes = rNode.children || []
    }

    //处理children
    if ((isArray && flowOwnerId && flowOwnerId === node.meta?.["x-controller"]?.id) || !isArray) {
      for (const childId of node.children) {
        const child = getNode(childId)
        if (child) {
          const children = getReactionableSchemas(child as ITreeNode<IFieldMeta, IControllerMeta>)
          activeNodes.push(...children)
        }
      }
    }
    //处理卡槽
    for (const key of Object.keys(node.slots || {})) {
      const slotId = node.slots?.[key]
      const child = getNode(slotId)
      if (child) {
        const children = getReactionableSchemas(child as ITreeNode<IFieldMeta, IControllerMeta>)
        activeNodes?.push(...children)
      }
    }
    return nodes
  }, [flowOwnerId, getNode])

  const getSchemaTreeOfView = useCallback((id: string) => {
    const doc = docs?.find(doc => doc.id === id)
    const rootNode = doc?.getRootNode()
    if (rootNode) {
      return getReactionableSchemas(rootNode as ITreeNode<IFieldMeta, IControllerMeta>)
    }

  }, [docs, getReactionableSchemas])

  return getSchemaTreeOfView
}
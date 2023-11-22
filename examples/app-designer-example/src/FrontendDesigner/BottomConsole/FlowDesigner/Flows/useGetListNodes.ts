import { ITreeNode } from "@rxdrag/core";
import { ControllerScopeType, IControllerMeta } from "@rxdrag/minions-runtime-react";
import { useDesignerEngine, useGetNode } from "@rxdrag/react-core";
import { useCallback } from "react";
import { ListNode } from "./ListNode";
import { IFieldMeta } from "@rxdrag/fieldy";

export function useGetListNodes() {
  const engine = useDesignerEngine()
  const docs = engine?.getAllDocuments()
  const getNode = useGetNode()
  const getReactionableSchemas = useCallback((node: ITreeNode<IFieldMeta, IControllerMeta>) => {
    const nodes: ListNode[] = []
    let activeNodes = nodes
    const ctrlMeta = node.meta["x-controller"]
    if (ctrlMeta?.enable && (ctrlMeta?.scopeType === ControllerScopeType.array || ctrlMeta?.scopeType === ControllerScopeType.tree)) {
      const rNode: ListNode = {
        node: node,
        children: []
      }
      nodes.push(rNode)
      activeNodes = rNode.children || []
    }

    //处理children
    for (const childId of node.children) {
      const child = getNode(childId)
      if (child) {
        const children = getReactionableSchemas(child as ITreeNode<IFieldMeta, IControllerMeta>)
        activeNodes.push(...children)
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
  }, [getNode])

  const getSchemaTreeOfView = useCallback((id: string) => {
    const doc = docs?.find(doc => doc.id === id)
    const rootNode = doc?.getRootNode()
    if (rootNode) {
      return getReactionableSchemas(rootNode as ITreeNode<IFieldMeta, IControllerMeta>)
    }

  }, [docs, getReactionableSchemas])

  return getSchemaTreeOfView
}
import { ITreeNode } from "@rxdrag/core";
import { IControllerMeta } from "@rxdrag/minions-runtime-react"
import { useCurrentNode, useAllNodes } from "@rxdrag/react-core"
import { INodeSchema } from "@rxdrag/schema";
import { useMemo } from "react"

export function useGlobalControllerMetas() {
  const nodes = useAllNodes() || [] as ITreeNode<INodeSchema, IControllerMeta>[];

  const currentNode = useCurrentNode()

  const controllerNodes: IControllerMeta[] = useMemo(() => {
    return nodes.filter(node => {
      const ctl = node.meta?.["x-controller"] as IControllerMeta
      return (ctl)?.global && ctl.enable
    }).map(node => ({ ...node.meta?.["x-controller"] || {}, name: (node.meta?.["x-controller"] as IControllerMeta)?.name || node.title })) as IControllerMeta[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, currentNode?.id])

  return controllerNodes
}
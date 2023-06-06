import { ITreeNode } from "@rxdrag/core";
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react"
import { useCurrentNode, useAllNodes } from "@rxdrag/react-core"
import { INodeSchema } from "@rxdrag/schema";
import { useMemo } from "react"

export function useGlobalControllerMetas() {
  const nodes = useAllNodes() || [] as ITreeNode<INodeSchema, ILogicFlowControllerMeta>[];
  const currentNode = useCurrentNode()

  const controllerNodes: ILogicFlowControllerMeta[] = useMemo(() => {
    return nodes.filter(node => {
      const ctl = node.meta?.["x-controller"] as ILogicFlowControllerMeta
      return (ctl)?.global && !!ctl.controllerType
    }).map(node => {
      const ctlMeta = ({ ...node.meta?.["x-controller"] || {}, name: (node.meta?.["x-controller"] as ILogicFlowControllerMeta)?.name || node.title }) as ILogicFlowControllerMeta
      return ctlMeta
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, currentNode?.id])

  return controllerNodes
}
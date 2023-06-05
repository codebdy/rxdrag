import { ITreeNode } from "@rxdrag/core";
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react"
import { useCurrentNode, useAllNodes } from "@rxdrag/react-core"
import { INodeSchema } from "@rxdrag/schema";
import { useMemo } from "react"
import { useFillControllerProps } from "./useFillControllerProps";

export function useGlobalControllerMetas() {
  const nodes = useAllNodes() || [] as ITreeNode<INodeSchema, ILogicFlowControllerMeta>[];
  const fill = useFillControllerProps();
  const currentNode = useCurrentNode()

  const controllerNodes: ILogicFlowControllerMeta[] = useMemo(() => {
    return nodes.filter(node => {
      const ctl = node.meta?.["x-controller"] as ILogicFlowControllerMeta
      return (ctl)?.global && ctl.enable
    }).map(node => {
      const ctlMeta = ({ ...node.meta?.["x-controller"] || {}, name: (node.meta?.["x-controller"] as ILogicFlowControllerMeta)?.name || node.title }) as ILogicFlowControllerMeta
      return fill(ctlMeta, node as ITreeNode<INodeSchema<unknown, unknown>, ILogicFlowControllerMeta>)
    }) 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, currentNode?.id, fill])

  return controllerNodes
}
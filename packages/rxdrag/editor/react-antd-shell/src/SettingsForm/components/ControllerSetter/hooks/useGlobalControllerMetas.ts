import { ITreeNode } from "@rxdrag/core";
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react"
import { useCurrentNode, useAllNodes } from "@rxdrag/react-core"
import { INodeSchema } from "@rxdrag/schema";
import { useMemo } from "react"
import { useFillControllerProps } from "./useFillControllerProps";

export function useGlobalControllerMetas() {
  const nodes = useAllNodes() || [] as ITreeNode<INodeSchema, ILogicFlowControllerMeta>[];
  const currentNode = useCurrentNode()
  const fillProps = useFillControllerProps();

  const controllerNodes: ILogicFlowControllerMeta[] = useMemo(() => {
    return nodes.filter(node => {
      const ctl = node.meta?.["x-controller"] as ILogicFlowControllerMeta
      return (ctl)?.global && !!ctl.controllerType
    }).map(node => {
      const ctlMeta = ({ ...node.meta?.["x-controller"] || {}, name: (node.meta?.["x-controller"] as ILogicFlowControllerMeta)?.name || node.title }) as ILogicFlowControllerMeta
      return fillProps(ctlMeta, node as ITreeNode<INodeSchema, ILogicFlowControllerMeta>)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, fillProps, currentNode?.id])

  return controllerNodes
}
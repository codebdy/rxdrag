import { ITreeNode } from "@rxdrag/core";
import { IControllerMeta } from "@rxdrag/minions-runtime-react"
import { useCurrentNode, useAllNodes } from "@rxdrag/react-core"
import { INodeSchema } from "@rxdrag/schema";
import { useMemo } from "react"
import { useFillControllerProps } from "./useFillControllerProps";

export function useGlobalControllerMetas() {
  const nodes = useAllNodes() || [] as ITreeNode<INodeSchema, IControllerMeta>[];
  const fill = useFillControllerProps();
  const currentNode = useCurrentNode()

  const controllerNodes: IControllerMeta[] = useMemo(() => {
    return nodes.filter(node => {
      const ctl = node.meta?.["x-controller"] as IControllerMeta
      return (ctl)?.global && ctl.enable
    }).map(node => {
      const ctlMeta = ({ ...node.meta?.["x-controller"] || {}, name: (node.meta?.["x-controller"] as IControllerMeta)?.name || node.title }) as IControllerMeta
      return fill(ctlMeta, node as ITreeNode<INodeSchema<unknown, unknown>, IControllerMeta>)
    }) 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, currentNode?.id, fill])

  return controllerNodes
}
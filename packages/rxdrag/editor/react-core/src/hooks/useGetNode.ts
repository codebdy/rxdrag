import { ID, ITreeNode } from "@rxdrag/core";
import { useCallback } from "react";
import { useDesignerEngine } from "./useDesignerEngine";
import { IControllerMeta } from "@rxdrag/schema";

export function useGetNode() {
  const engine = useDesignerEngine()

  const getNode = useCallback((nodeId?: ID | null) => {
    if (!nodeId) {
      return null
    }
    return engine?.getMonitor().getNode(nodeId || "") as ITreeNode<unknown, IControllerMeta> | undefined
  }, [engine])

  return getNode
}
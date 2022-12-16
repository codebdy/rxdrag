import { ID } from "core/interfaces";
import { useCallback } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

export function useGetNode() {
  const engine = useDesignerEngine()

  const getNode = useCallback((nodeId?: ID | null) => {
    if (!nodeId) {
      return null
    }
    return engine?.getMonitor().getNode(nodeId || "")
  }, [engine])

  return getNode
}
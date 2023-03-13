import { ID } from "@rxdrag/core";
import { useCallback } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

export function useRemoveSlot(nodeId?: ID) {
  const engine = useDesignerEngine()
  const removeSlot = useCallback((name: string) => {
    if (nodeId) {
      const document = engine?.getNodeDocument(nodeId || "")
      document?.removeSlot(nodeId, name)
    }
  }, [engine, nodeId])

  return removeSlot
}
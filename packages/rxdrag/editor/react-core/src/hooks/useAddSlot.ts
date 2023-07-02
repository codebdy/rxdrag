import { ID } from "@rxdrag/core";
import { useCallback } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

export function useAddSlot(nodeId?: ID) {
  const engine = useDesignerEngine()

  const addSlot = useCallback((name: string) => {
    if (nodeId) {
      const doc = engine?.getNodeDocument(nodeId || "")
      doc?.addSlot(nodeId, name)
    }
  }, [engine, nodeId])

  return addSlot
}
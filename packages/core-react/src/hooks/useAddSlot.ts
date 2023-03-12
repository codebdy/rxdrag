import { ID } from "core/interfaces";
import { useCallback } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

export function useAddSlot(nodeId?: ID) {
  const engine = useDesignerEngine()

  const addSlot = useCallback((name: string) => {
    if (nodeId) {
      const document = engine?.getNodeDocument(nodeId || "")
      document?.addSlot(nodeId, name)
    }
  }, [engine, nodeId])

  return addSlot
}
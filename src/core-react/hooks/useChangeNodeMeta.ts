import { ID, INodeMeta } from "core/interfaces";
import { useCallback } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

export function useChangeNodeMeta() {
  const engine = useDesignerEngine()
  const changeMeta = useCallback((nodeId: ID, meta: INodeMeta) => {
    const document = engine?.getNodeDocument(nodeId)
    document?.changeNodeMeta(nodeId, meta)
  }, [engine])

  return changeMeta
}
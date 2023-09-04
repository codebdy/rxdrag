import { NodeBehavior } from "@rxdrag/core";
import { useCallback, useEffect, useState } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

export function useBehavior(nodeId?: string) {
  const [behavior, setBehavior] = useState<NodeBehavior>()
  const engine = useDesignerEngine()

  useEffect(() => {
    if (nodeId) {
      setBehavior(engine?.getNodeBehavior(nodeId))
    }

  }, [engine, nodeId])

  const handleBehaviorChange = useCallback(() => {
    if (nodeId) {
      setBehavior(engine?.getNodeBehavior(nodeId))
    }
  }, [engine, nodeId])

  useEffect(() => {
    const unsub = engine?.getBehaviorManager().subscribeBehaviorsChange(handleBehaviorChange)

    return unsub
  }, [engine, handleBehaviorChange])

  return behavior
}
import { useCallback, useEffect, useState } from "react";
import { useDesignerEngine } from "./useDesignerEngine";
import { INodeBehavior } from "@rxdrag/core";

export function useBehavior(nodeId?: string) {
  const [behavior, setBehavior] = useState<INodeBehavior>()
  const engine = useDesignerEngine()

  useEffect(() => {
    if (nodeId) {
      setBehavior(engine?.getBehaviorManager().getNodeBehavior(nodeId))
    }

  }, [engine, nodeId])

  const handleBehaviorChange = useCallback(() => {
    if (nodeId) {
      setBehavior(engine?.getBehaviorManager().getNodeBehavior(nodeId))
    }
  }, [engine, nodeId])

  useEffect(() => {
    const unsub = engine?.getBehaviorManager().subscribeBehaviorsChange(handleBehaviorChange)

    return unsub
  }, [engine, handleBehaviorChange])

  return behavior
}
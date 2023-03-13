import { ID } from "@rxdrag/core";
import { useCallback, useEffect, useState } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

export function useActiveIdState(): [ID | null | undefined, (id: ID | null | undefined) => void] {
  const [activeId, setActiveId] = useState<ID | null>()
  const designer = useDesignerEngine()

  const getActiveNodeId = useCallback(() => {
    const aId = designer?.getMonitor().getState().activedNodeId
    setActiveId(aId)
  }, [designer])

  useEffect(() => {
    getActiveNodeId()
  }, [getActiveNodeId])

  const handleActiveChange = useCallback((id?: ID | null) => {
    setActiveId(id)
  }, [])

  const handleSetActiveId =  useCallback((id?: ID | null) => {
    designer?.getActions().activeNode(id)
  }, [designer])


  useEffect(() => {
    const unscribe = designer?.getMonitor().subscribeToActiveChanged(handleActiveChange)
    return () => {
      unscribe?.()
    }
  }, [designer, handleActiveChange])
  return [activeId, handleSetActiveId]
}
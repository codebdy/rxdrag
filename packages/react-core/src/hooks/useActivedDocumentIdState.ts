import { ID } from "@rxdrag/core";
import { useCallback, useEffect, useState } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

export function useActivedDocumentIdState(): [ID | null | undefined, (id: ID | null | undefined) => void] {
  const [activeId, setActiveId] = useState<ID | null>()
  const designer = useDesignerEngine()

  const getActiveDocumentId = useCallback(() => {
    const aId = designer?.getMonitor().getState().activedDocumentId
    setActiveId(aId)
  }, [designer])

  useEffect(() => {
    getActiveDocumentId()
  }, [getActiveDocumentId])

  const handleActiveChange = useCallback((id?: ID | null) => {
    setActiveId(id)
  }, [])

  const handleSetActiveId = useCallback((id?: ID | null) => {
    designer?.getActions().changeActivedDocument(id || null)
  }, [designer])


  useEffect(() => {
    const unscribe = designer?.getMonitor().subscribeToActiveDocumentChanged(handleActiveChange)
    return () => {
      unscribe?.()
    }
  }, [designer, handleActiveChange])
  return [activeId, handleSetActiveId]
}
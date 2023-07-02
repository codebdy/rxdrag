import { ID, DocumentSelectionMode } from "@rxdrag/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useActivedDocumentIdState } from "./useActivedDocumentIdState";
import { useDesignerEngine } from "./useDesignerEngine";

export function useSelectionModeState(documentId?: ID): [DocumentSelectionMode, (mode: DocumentSelectionMode) => void] {
  const [selectionMode, setSelectionMode] = useState<DocumentSelectionMode>(DocumentSelectionMode.Normal)
  const designer = useDesignerEngine()
  const [activedDocumentId] = useActivedDocumentIdState()

  const realDocumentId = useMemo(() => documentId || activedDocumentId, [activedDocumentId, documentId])

  const getViewType = useCallback(() => {
    if (realDocumentId) {
      const selectMode = designer?.getMonitor().getState().documentsById?.[realDocumentId]?.selectionMode
      setSelectionMode(selectMode || DocumentSelectionMode.Normal)
    }

  }, [realDocumentId, designer])

  useEffect(() => {
    getViewType()
  }, [getViewType])

  const handleViewTypeChange = useCallback((mode: DocumentSelectionMode) => {
    setSelectionMode(mode)
  }, [])

  const handleChangeMode = useCallback((mode: DocumentSelectionMode) => {
    if (realDocumentId) {
      designer?.getActions().setSelectionMode(realDocumentId, mode)
    }
  }, [realDocumentId, designer])


  useEffect(() => {
    const unscribe = designer?.getMonitor().subscribeToSelectionMode(realDocumentId || "", handleViewTypeChange)
    return () => {
      unscribe?.()
    }
  }, [realDocumentId, designer, handleViewTypeChange])
  return [selectionMode, handleChangeMode]
}
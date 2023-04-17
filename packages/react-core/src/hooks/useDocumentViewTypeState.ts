import { DefulstViewType, ID, ViewType } from "@rxdrag/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useActivedDocumentIdState } from "./useActivedDocumentIdState";
import { useDesignerEngine } from "./useDesignerEngine";

export function useDocumentViewTypeState(documentId?:ID): [ViewType, (viewType: ViewType) => void] {
  const [viewType, setViewType] = useState<ViewType>(DefulstViewType)
  const designer = useDesignerEngine()
  const [activedDocumentId] = useActivedDocumentIdState()

  const realDocumentId = useMemo(()=>documentId||activedDocumentId, [activedDocumentId, documentId])
  
  const getViewType = useCallback(() => {
    if (realDocumentId) {
      const vwType = designer?.getMonitor().getState().documentsById?.[realDocumentId]?.viewType
      setViewType(vwType || DefulstViewType)
    }

  }, [realDocumentId, designer])

  useEffect(() => {
    getViewType()
  }, [getViewType])

  const handleViewTypeChange = useCallback((vwType: ViewType) => {
    setViewType(vwType)
  }, [])

  const handleChangeViewType = useCallback((vwType: ViewType) => {
    if (realDocumentId) {
      designer?.getActions().changeDocumentView(realDocumentId, vwType)
    }
  }, [realDocumentId, designer])


  useEffect(() => {
    const unscribe = designer?.getMonitor().subscribeToDocumentViewChange(realDocumentId || "", handleViewTypeChange)
    return () => {
      unscribe?.()
    }
  }, [realDocumentId, designer, handleViewTypeChange])
  return [viewType, handleChangeViewType]
}
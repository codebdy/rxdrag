import { CanvasWidthLimits } from "@rxdrag/core";
import { useCallback, useEffect, useState } from "react";
import { useActivedDocumentIdState } from "./useActivedDocumentIdState";
import { useDesignerEngine } from "./useDesignerEngine";

export function useCanvasWidthLimitsState(): [CanvasWidthLimits | null, (limits: CanvasWidthLimits | null) => void] {
  const [limits, setLimits] = useState<CanvasWidthLimits | null>(null)
  const designer = useDesignerEngine()
  const [activedDocumentId] = useActivedDocumentIdState()

  const getWidth = useCallback(() => {
    if (activedDocumentId) {
      const lts = designer?.getMonitor().getState().documentsById?.[activedDocumentId]?.canvasWidthLimits
      setLimits(lts || null)
    }

  }, [activedDocumentId, designer])

  useEffect(() => {
    getWidth()
  }, [getWidth])

  const handleWidthLimitsChange = useCallback((lmts?: CanvasWidthLimits | null) => {
    setLimits(lmts || null)
  }, [])

  const handleSetCanvasWidth = useCallback((wth?: CanvasWidthLimits | null) => {
    if (activedDocumentId) {
      designer?.getActions().changeCanvasWidthLimits(activedDocumentId, wth || null)
    }
  }, [activedDocumentId, designer])


  useEffect(() => {
    const unscribe = designer?.getMonitor().subscribeToCanvasWidthLimitsChange(activedDocumentId || "", handleWidthLimitsChange)
    return () => {
      unscribe?.()
    }
  }, [activedDocumentId, designer, handleWidthLimitsChange])
  return [limits, handleSetCanvasWidth]
}
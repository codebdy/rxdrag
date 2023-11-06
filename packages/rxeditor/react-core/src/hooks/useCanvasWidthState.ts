import { useCallback, useEffect, useState } from "react";
import { useActivedDocumentIdState } from "./useActivedDocumentIdState";
import { useDesignerEngine } from "./useDesignerEngine";

export function useCanvasWidthState(): [number | null | undefined, (width: number | null | undefined) => void] {
  const [width, setWidth] = useState<number | null>()
  const designer = useDesignerEngine()
  const [activedDocumentId] = useActivedDocumentIdState()

  const getWidth = useCallback(() => {
    if (activedDocumentId) {
      const wth = designer?.getMonitor().getState().documentsById?.[activedDocumentId]?.canvasWidth
      setWidth(wth)
    }

  }, [activedDocumentId, designer])

  useEffect(() => {
    getWidth()
  }, [getWidth])

  const handleWidthChange = useCallback((wth?: number | null) => {
    setWidth(wth)
  }, [])

  const handleSetCanvasWidth = useCallback((wth?: number | null) => {
    if (activedDocumentId) {
      designer?.getActions().changeCanvasWidth(activedDocumentId, wth || null)
    }
  }, [activedDocumentId, designer])


  useEffect(() => {
    const unscribe = designer?.getMonitor().subscribeToCanvasWidthChange(activedDocumentId || "", handleWidthChange)
    return () => {
      unscribe?.()
    }
  }, [activedDocumentId, designer, handleWidthChange])
  return [width, handleSetCanvasWidth]
}
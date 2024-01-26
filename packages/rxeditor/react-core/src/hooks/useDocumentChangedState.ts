import { useCallback, useEffect, useState } from "react";
import { useActivedDocumentIdState } from "./useActivedDocumentIdState";
import { useDesignerEngine } from "./useDesignerEngine";

export function useDocumentChangedState(): [boolean, () => void] {
  const [changed, setChanged] = useState<boolean>(false)
  const designer = useDesignerEngine()
  const [activedDocumentId] = useActivedDocumentIdState()

  const getWidth = useCallback(() => {
    if (activedDocumentId) {
      const chg = designer?.getMonitor().getState().documentsById?.[activedDocumentId]?.changed
      setChanged(chg || false)
    }

  }, [activedDocumentId, designer])

  useEffect(() => {
    getWidth()
  }, [getWidth])

  const handleChanged = useCallback((chg: boolean) => {
    setChanged(chg)
  }, [])

  const handleClear = useCallback(() => {
    if (activedDocumentId) {
      designer?.getDocument(activedDocumentId)?.clearChanged()
    }
  }, [activedDocumentId, designer])


  useEffect(() => {
    const unscribe = designer?.getMonitor().subscribeToDocumentChanged(activedDocumentId || "", handleChanged)
    return () => {
      unscribe?.()
    }
  }, [activedDocumentId, designer, handleChanged])
  return [changed, handleClear]
}